import os
import sys
import cv2
import zipfile
from flask import Flask, request, send_file, send_from_directory
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes


def convert_aspect_ratio(frame, new_width, new_height):
    height, width = frame.shape[:2]
    resized_frame = cv2.resize(frame, (new_width, new_height))
    return resized_frame

def process_video(input_video_path, output_video_path, object_name):
   
    video_capture = cv2.VideoCapture(input_video_path)

    if not video_capture.isOpened():
        print('Error opening video file')
        return


    original_width = int(video_capture.get(cv2.CAP_PROP_FRAME_WIDTH))
    original_height = int(video_capture.get(cv2.CAP_PROP_FRAME_HEIGHT))
    frame_rate = video_capture.get(cv2.CAP_PROP_FPS)

    # 9:16 aspect ratio
    new_width = int(original_height * 9 / 16)
    new_height = original_height


    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    output_video = cv2.VideoWriter(output_video_path, fourcc, frame_rate, (new_width, new_height))

    
    while True:
        # Read the next frame
        ret, frame = video_capture.read()
        if not ret:
            break

        converted_frame = convert_aspect_ratio(frame, new_width, new_height)
        output_video.write(converted_frame)

    video_capture.release()
    output_video.release()

@app.route('/upload', methods=['POST'])
def upload():
    if 'file' not in request.files:
        return 'No file part in the request', 400

    file = request.files['file']
    if file.filename == '':
        return 'No selected file', 400

    uploaded_video_path = 'uploaded_video.mp4'
    file.save(uploaded_video_path)

    object_name = request.form.get('object_name')

    # output video path
    output_video_path = 'resized_video.mp4'

    # Process the uploaded video
    process_video(uploaded_video_path, output_video_path, object_name)

    # Use the output video as input to the YOLO script and generate output frames
    yolo_script = 'yolo.py'
    yolo_command = f'python {yolo_script} -v {output_video_path} -c yolov3.cfg -w yolov3.weights -cl yolov3.txt -obj {object_name}'
    os.system(yolo_command)

    output_path = 'resized_video_output.mp4'

    # download link
    return send_file(output_path, as_attachment=True)

if __name__ == '__main__':
    app.run()