## Objectives:
Kindly, go through this codebase and fix the following issues in this codebase:
 1. There is significant latency between the (mouse-click + mouse-drag)-event and the modal actually moving. Fix this latency, so that the modal moves along with the mouse-drag ([see this video](./task/issue-video.mp4))
 2. While draging the mouse, the modal initially seems to twist clockwise by a few degrees, and stays in that position all throughout the drag-event. Remove this feature so that the model remains upright while moving. ([see this video](./task/issue-video.mp4))

## Recommended: 
 - We recommend you don't use any AI tool to directly to make the edits (such as uploading the entire code-base and prompting the system to make the specified changes). Instead, use the AI tool to improve your understanding of the source code.
 - Try to understand the codebase as much as possible. Also, use the browser developer tools by setting breakpoints and stepping through the code to make sense of the program execution.

## Deployment instructions:
```shell
# Build and run with Docker
docker build -t movable-modal-app .
docker run -p 8080:80 movable-modal-app

# Access at http://localhost:8080
```
