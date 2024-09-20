# awx-api-client

Open API Definition and typescript Client Generator with Test for AWX

## Requirements 

* Docker
* Docker Compose.
* Ansible 
* OpenSSL
* Node
* Yarn

### First time
#### Get python pip installed
```sh
sudo apt install python3-pip
```
#### Get Ansible
```sh
pip install ansible
```
#### Install dependencies
```sh
yarn install
```

## Regenerating the swagger definition

### Build AWX devel

```sh
yarn awx:build
```

### Start AWX devel

```sh
yarn awx:start
```

### Creating AWX superuser (optional)

```sh
yarn awx:superuser
```

At this point you should be able to access the AWX Swagger Interface at https://localhost:8043/api/swagger/

1. Download the open api definition from https://localhost:8043/api/swagger/?format=openapi and save it to spec.json







