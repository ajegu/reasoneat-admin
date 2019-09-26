import Keycloak from 'keycloak-js'

const initOptions = {
  'realm': 'local',
  'url': 'http://localhost:8080/auth',
  'clientId': 'vue'
}

export const keycloak = new Keycloak(initOptions)
