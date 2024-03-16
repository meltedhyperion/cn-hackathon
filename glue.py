from __future__ import print_function

import json
import boto3

print("Loading function")

glue = boto3.client(
    service_name="glue",
    region_name="ap-south-1",
    endpoint_url="https://glue.ap-south-1.amazonaws.com",
)


def lambda_handler(event, context):
    try:
        glue.start_crawler(Name="cad")
    except Exception as e:
        print(e)
        print("Error starting crawler")
        raise e
    return "ok"
