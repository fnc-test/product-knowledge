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
  sed -i -e "s#\"REACT_APP_SKILL_CONNECTOR_CONTROL\"#\"${REACT_APP_SKILL_CONNECTOR_CONTROL//#/\\#}\"#g" \
      -e "s#\"REACT_APP_SKILL_CONNECTOR_DATA\"#\"${REACT_APP_SKILL_CONNECTOR_DATA//#/\\#}\"#g" \
      -e "s#\"REACT_APP_SKILL_CONNECTOR_AUTH_HEADER_KEY\"#\"${REACT_APP_SKILL_CONNECTOR_AUTH_HEADER_KEY//#/\\#}\"#g" \
      -e "s#\"REACT_APP_SKILL_CONNECTOR_AUTH_HEADER_VALUE\"#\"${REACT_APP_SKILL_CONNECTOR_AUTH_HEADER_VALUE//#/\\#}\"#g" \
      -e "s#\"REACT_APP_SKILL_GITHUB_ONTOLOGYHUB\"#\"${REACT_APP_SKILL_GITHUB_ONTOLOGYHUB//#/\\#}\"#g" \
      -e "s#\"REACT_APP_SKILL_BACKEND\"#\"${REACT_APP_SKILL_BACKEND//#/\\#}\"#g" \
      -e "s#\"REACT_APP_FOLDER\"#\"${REACT_APP_FOLDER//#/\\#}\"#g" $file
done

catalina.sh "$@"
