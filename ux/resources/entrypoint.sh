#!/bin/sh

#
# Extended start script to emulate the effect of environment variables
# on the compiled source code
# See copyright notice in the top folder
# See authors file in the top folder
# See license file in the top folder
#

for file in /usr/local/tomcat/webapps/ROOT/static/js/*.js
do
  sed -i -e "s#REACT_APP_SKILL_CONNECTOR_CONTROL:\"[^\"]*\"#REACT_APP_SKILL_CONNECTOR_CONTROL:\"${REACT_APP_SKILL_CONNECTOR_CONTROL//#/\\#}\"#" \
      -e "s#REACT_APP_SKILL_CONNECTOR_DATA:\"[^\"]*\"#REACT_APP_SKILL_CONNECTOR_DATA:\"${REACT_APP_SKILL_CONNECTOR_DATA//#/\\#}\"#" \
      -e "s#REACT_APP_SKILL_CONNECTOR_AUTH_HEADER_KEY:\"[^\"]*\"#REACT_APP_SKILL_CONNECTOR_AUTH_HEADER_KEY:\"${REACT_APP_SKILL_CONNECTOR_AUTH_HEADER_KEY//#/\\#}\"#" \
      -e "s#REACT_APP_SKILL_CONNECTOR_AUTH_HEADER_VALUE:\"[^\"]*\"#REACT_APP_SKILL_CONNECTOR_AUTH_HEADER_VALUE:\"${REACT_APP_SKILL_CONNECTOR_AUTH_HEADER_VALUE//#/\\#}\"#" \
      -e "s#REACT_APP_SKILL_GITHUB_ONTOLOGYHUB:\"[^\"]*\"#REACT_APP_SKILL_GITHUB_ONTOLOGYHUB:\"${REACT_APP_SKILL_GITHUB_ONTOLOGYHUB//#/\\#}\"#" \
      -e "s#REACT_APP_FOLDER:\"[^\"]*\"#REACT_APP_FOLDER:\"${REACT_APP_FOLDER//#/\\#}\"#" $file
done

catalina.sh "$@"
