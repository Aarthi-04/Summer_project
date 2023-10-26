import cv2
import argparse
import numpy as np
import os

# timestamp
def add_timestamp(frame, timestamp):
    font = cv2.FONT_HERSHEY_SIMPLEX
    font_scale = 0.8
    font_thickness = 2
    text_size = cv2.getTextSize(timestamp, font, font_scale, font_thickness)[0]
    text_x = frame.shape[1] - text_size[0] - 10
    text_y = text_size[1] + 10
    cv2.putText(frame, timestamp, (text_x, text_y), font, font_scale, (0, 255, 0), font_thickness, cv2.LINE_AA)
    return frame

def get_output_layers(net):
    layer_names = net.getLayerNames()
    try:
        output_layers = [layer_names[i[0] - 1] for i in net.getUnconnectedOutLayers()]
    except:
        output_layers = [layer_names[i - 1] for i in net.getUnconnectedOutLayers()]
    return output_layers

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('-v', '--video', required=True, help='path to input video')
    ap.add_argument('-c', '--config', required=True, help='path to YOLO config file')
    ap.add_argument('-w', '--weights', required=True, help='path to YOLO pre-trained weights')
    ap.add_argument('-cl', '--classes', required=True, help='path to text file containing class names')
    ap.add_argument('-obj', '--object', required=True, help='object to display in the frame')
    args = ap.parse_args()

    video = cv2.VideoCapture(args.video)

    frame_width = int(video.get(cv2.CAP_PROP_FRAME_WIDTH))
    frame_height = int(video.get(cv2.CAP_PROP_FRAME_HEIGHT))

    # fps
    fps = video.get(cv2.CAP_PROP_FPS)

    scale = 0.00392

    classes = None

    with open(args.classes, 'r') as f:
        classes = [line.strip() for line in f.readlines()]

    net = cv2.dnn.readNet(args.weights, args.config)

    frame_count = 0  

    # timestamp of the video in milliseconds
    start_timestamp_ms = video.get(cv2.CAP_PROP_POS_MSEC)

    # output frames directory
    output_frames_dir = os.path.join(os.path.dirname(args.video), f"{os.path.basename(args.video).split('.')[0]}_frames")
    if not os.path.exists(output_frames_dir):
        os.makedirs(output_frames_dir)

    #VideoWriter object for MP4
    output_video_path = os.path.join(os.path.dirname(args.video), f"{os.path.basename(args.video).split('.')[0]}_output.mp4")
    output_video = cv2.VideoWriter(output_video_path, cv2.VideoWriter_fourcc(*'H264'), int(fps), (frame_width, frame_height))

    while True:
        ret, frame = video.read()
        if not ret:
            break

        blob = cv2.dnn.blobFromImage(frame, scale, (416, 416), (0, 0, 0), True, crop=False)

        net.setInput(blob)
        outs = net.forward(get_output_layers(net))

        class_ids = []
        confidences = []
        boxes = []
        conf_threshold = 0.5
        nms_threshold = 0.4

        for out in outs:
            for detection in out:
                scores = detection[5:]
                class_id = np.argmax(scores)
                confidence = scores[class_id]
                if confidence > conf_threshold and classes[class_id] == args.object:
                    center_x = int(detection[0] * frame_width)
                    center_y = int(detection[1] * frame_height)
                    w = int(detection[2] * frame_width)
                    h = int(detection[3] * frame_height)
                    x = center_x - w // 2
                    y = center_y - h // 2
                    class_ids.append(class_id)
                    confidences.append(float(confidence))
                    boxes.append([x, y, w, h])

        indices = cv2.dnn.NMSBoxes(boxes, confidences, conf_threshold, nms_threshold)

        for i in range(len(boxes)):
            if i in indices:
                box = boxes[i]
                x, y, w, h = box

                cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)

                #timestamp for the current frame using the start timestamp and frame rate
                timestamp_ms = start_timestamp_ms + (frame_count * 1000 / fps)
                timestamp_seconds, milliseconds = divmod(int(timestamp_ms), 1000)
                timestamp_minutes, timestamp_seconds = divmod(timestamp_seconds, 60)
                timestamp_hours, timestamp_minutes = divmod(timestamp_minutes, 60)
                timestamp = f"{int(timestamp_seconds):02d}:{int(milliseconds):03d}"

                
                frame_with_timestamp = add_timestamp(frame, timestamp)

                # Save the frame 
                output_frame_path = os.path.join(output_frames_dir, f"frame_{frame_count}.jpg")
                cv2.imwrite(output_frame_path, frame_with_timestamp)

                
                output_video.write(frame_with_timestamp)
                frame_count += 1

   
    output_video.release()
    video.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    main()
