import Keycloak from 'keycloak-js'

const initOptions = {
  'realm': 'local',
  'url': 'http://localhost:8090/auth',
  'clientId': 'reasoneat'
}

export const keycloak = new Keycloak(initOptions)
