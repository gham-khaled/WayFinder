bucket_name='wayfinder.com'
#region='eu-west-1'
profile='sinda'
create:
	aws s3 mb s3://$(bucket_name) --profile=sinda
configuration:
	aws s3 website s3://$(bucket_name) --index-document index.html --error-document index.html  --profile sinda

build:
	ng build
policy:
	aws s3api put-bucket-policy --bucket=$(bucket_name) --policy file://policy.json --profile sinda

s3:  build
	aws s3 sync dist/pathfinding-visualizer s3://$(bucket_name)
s3_local: build
	aws s3 sync dist/pathfinding-visualizer s3://$(bucket_name) --profile sinda
