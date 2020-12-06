#!/bin/bash

set -e

cd /var/www/
if [ -d "csicovidweb.tk" ]; then sudo rm -Rf csicovidweb.tk; fi
sudo mkdir csicovidweb.tk
cd csicovidweb.tk
sudo mv /home/ubuntu/apps/build* .
sudo chown -R www-data:www-data /var/www/csicovidweb
sudo systemctl restart nginx