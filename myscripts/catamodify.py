import psycopg2
import os
from PIL import Image, ImageDraw, ImageFont

# Database connection parameters
db_params = {
    "host": "localhost",
    "database": "testdb",
    "user": "postgres",
    "password": "Post@140104",
    "port": "5432"
}

# Connect to the database
conn = psycopg2.connect(**db_params)
cursor = conn.cursor()

# Retrieve image paths from the database
cursor.execute("SELECT image_path FROM catalog")
image_paths = cursor.fetchall()

# Iterate through each image path
for path_tuple in image_paths:
    image_path = path_tuple[0]
    if image_path.endswith(".png"):
        # Open the image
        image = Image.open(image_path)

        # Prepare the draw object
        draw = ImageDraw.Draw(image)
        width, height = image.size

        # Define the text and font
        text = "A"
        font = ImageFont.load_default()

        # Calculate the position for the text (bottom half)
        text_width, text_height = draw.text(text=text, font=font,xy=0)
        position = ((width - text_width) // 2, (height + text_height) // 2)

        # Draw the text on the image
        draw.text(position, text, font=font, fill="white")

        # Save the modified image with the new extension if necessary
        new_path = image_path
        if image_path.endswith(".jpg"):
            new_path = image_path[:-3] + "jpeg"
        image.save(new_path)

        # Update the database record with the new path if it has changed
        if new_path != image_path:
            cursor.execute("UPDATE catalog SET image_path = %s WHERE image_path = %s", (new_path, image_path))
            conn.commit()

# Close the cursor and connection
cursor.close()
conn.close()
