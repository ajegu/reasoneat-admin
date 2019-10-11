## Instance de Keycloak
`docker run -d -p 8090:8080 -e KEYCLOAK_USER=admin -e KEYCLOAK_PASSWORD=password -e KEYCLOAK_IMPORT=/tmp/my_realm.json -v /Users/allan/WebApps/reasoneat-admin/keycloak/my_realm.json:/tmp/my_realm.json jboss/keycloak`

### Export de Keycloak
docker run -d -p 8180:8080 -e KEYCLOAK_USER=admin -e \
KEYCLOAK_PASSWORD=admin -v /Users/allan/WebApps/reasoneat-admin/keycloak:/tmp --name kc \
jboss/keycloak

docker exec -it kc keycloak/bin/standalone.sh \
-Djboss.socket.binding.port-offset=100 -Dkeycloak.migration.action=export \
-Dkeycloak.migration.provider=singleFile \
-Dkeycloak.migration.realmName=local \
-Dkeycloak.migration.usersExportStrategy=REALM_FILE \
-Dkeycloak.migration.file=/tmp/my_realm.json