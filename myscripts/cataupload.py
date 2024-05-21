import pandas as pd
from sqlalchemy import create_engine
import os

# Read the Excel file
df = pd.read_excel('C:\\Users\\aman\\Downloads\\Catalog Digitization\\Catalog Digitization\\ONDC Test Data _ Images\\ONDC Sample Data.xlsx')

# Database connection
engine = create_engine('postgresql://postgres:Post%40140104@localhost:5432/testdb')


# Function to construct image path
def construct_image_path(image_name):
    return os.path.join('C:\\Users\\aman\\Downloads\\Catalog Digitization\\Catalog Digitization\\ONDC Test Data _ Images\\Product Images', image_name)


# Add the full image path to the dataframe
df['image_path'] = df['image'].apply(construct_image_path)

# Drop the original image column if needed
df.drop(columns=['image'], inplace=True)

# Insert data into the database
df.to_sql('catalog', engine, if_exists='append', index=False)
