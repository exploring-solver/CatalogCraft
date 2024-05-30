import pyautogui
import time
import keyboard

# Initialize an empty list to store the path
path = []

# Function to record the mouse path
def record_path():
    print("Recording mouse path. Press 's' to stop recording.")
    while not keyboard.is_pressed('s'):
        x, y = pyautogui.position()
        path.append((x, y))
        time.sleep(0.01)  # Sleep for a short duration to avoid excessive recording rate

# Function to replay the recorded path
def replay_path(path, delay=0.01):
    print("Replaying mouse path. Press 'q' to quit.")
    while not keyboard.is_pressed('q'):
        for point in path:
            pyautogui.moveTo(point[0], point[1], duration=delay)

# Main script
print("Press 'r' to start recording the mouse path.")
keyboard.wait('r')  # Wait for the user to press 'r' to start recording

record_path()

replay_path(path)
print("Script terminated.")
