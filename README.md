# Surveillance marked object detection

PROJECT GITHUB PAGE : https://aarthi-04.github.io/sp/

PROBLEM STATEMENT:-
    In today's world, we use a lot of surveillance cameras in public places, like streets, buses, and stores, to help keep people safe and stop bad things from happening. But watching all the recorded videos one by one takes a long time and is expensive. Because of this, we might miss seeing important things or people that we need to pay attention to.
    
ABSTRACT:-
    In today's world, surveillance cameras are extensively deployed in public spaces, transportation systems, and commercial establishments to ensure public safety and prevent unlawful activities. However, analyzing a large volume of video footage manually can be time-consuming and resource-intensive, leading to potential lapses in detecting critical events or individuals of interest. We introduce an innovative solution for enhancing surveillance video analysis through Intelligent Object Detection and Adaptive Cropping. This system seamlessly integrates advanced computer vision techniques with web technologies to improve the analysis of surveillance footage. Leveraging OpenCV and YOLOv3 algorithm, the system detects user-specified objects in MP4-format surveillance videos, dynamically adjusts the video's aspect ratio, and optimizes playback by automatically trimming irrelevant frames. The system is accessible via a user-friendly web interface powered by a Flask server and React.js frontend, ensuring efficient interaction and real-time feedback.

The system begins by processing user-provided MP4-format surveillance videos captured in the standard 16:9 aspect ratio. The video stream is adaptively converted to a vertical 9:16 aspect ratio using OpenCV, aligning with modern viewing preferences. The YOLOv3 algorithm is employed for real-time object detection and tracking within the video frames. This enhances the analysis process by emphasizing relevant classes. The system has the capability to automatically truncate surveillance videos, retaining only frames containing the detected object. This adaptive video cropping optimizes analysis time and eliminates unnecessary content. Users can preview and verify object detection results within the surveillance video frames, ensuring precise identification.

Thus, our Surveillance Video Analysis system introduces an enhanced approach to improve analysis of surveillance footage by using Intelligent Object Detection and Adaptive Cropping. By integrating OpenCV, YOLOv3, Flask, and React.js, the system seamlessly enhances surveillance videos, fostering improved insights and efficient processing.


