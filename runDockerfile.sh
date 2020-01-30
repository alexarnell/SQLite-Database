echo "Creating Server"

docker login -u cyberrangeudel -p SuperSecureLogon00
docker pull node:10
docker build --rm=false -f "app/Dockerfile" -t app:latest app
port="3000"
subnet="10"

while [ true ]
do
    cmd=`lsof -i:$port`
    if [ -z "$cmd" ]
    then
        break
    fi
    port=$(( $port + 1 ))

    server=$port
    subnet=$(( $subnet + 1))
done

echo $port
docker run -it -p $port:3000 app:latest
