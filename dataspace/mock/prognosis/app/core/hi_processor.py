"""
File contains the core logic which would power HI resource.
"""
import logging
import json
from datetime import datetime
import random

from app.utils.exceptions import CustomException

LOGGER = logging.getLogger("HI")

class HiService:
    """ This class supports HI resource with needed functionalities. """

    def __init__(self, hi_data: dict, hi_filename: str) -> None:
        """
        Constructor for HiService class

        Args:
            hi_data: Load Collective & adaption data loaded from uploaded file
            hi_filename: request id 
        """

        self.hi_data = hi_data
        self.hi_filename = hi_filename

        self.hi_component = hi_data.get("componentId")
        if not self.hi_component:
            raise CustomException(
                error_message=f"Health Indicator Input "
                              f"does not have componentId which is mandatory.",
                metadata=self.hi_filename
             )

        errors = self.validate()

        if errors:
            LOGGER.warning(f"Health indicator file produced errors {errors}.")
            raise CustomException(
                error_message=f"Health Indicator Input does not have "
                              f"{','.join(errors)} information which are mandatory.",
                metadata=self.hi_component
            )

        self.hi_hash = hash(json.dumps(hi_data,sort_keys=True))

        LOGGER.info("Health indicator file passed all the validations")

    def validate(self) -> list:
        """
        This method takes care of checking validations on uploaded hi file.
        If any validation fails, then throws 400 status code response with ErrorMessage.

        Returns: error if not raise CustomException with error message

        Raises:
            CustomException: If any validation fail will raise custom exception
        """

        LOGGER.info(f"Validating indicator file for component {self.hi_component}.")

        errors = []

        classifiedLoadCollective =  self.hi_data.get("classifiedLoadCollective")

        if not classifiedLoadCollective:
            raise CustomException(
                error_message=f"Health Indicator Input does not have "
                              f"classifiedLoadCollective which is mandatory.",
                            metadata=self.hi_component
                        )

        LOGGER.info(f"Validating load collective for component {self.hi_component}.")

        header = classifiedLoadCollective.get("header")
        if not header:
            raise CustomException(
                 error_message=f"Health Indicator Input does not have "
                               f"classifiedLoadCollective.header which is mandatory.",
                               metadata=self.hi_component
                 )

        channels = header.get("channels")
        if (not channels or not isinstance(channels, list)):
            raise CustomException(
                 error_message=f"Health Indicator Input does not have a "
                               f"classifiedLoadCollective.header.channels array which is mandatory.",
                              metadata=self.hi_component
            )
        channelsCount = len(channels)

        body = classifiedLoadCollective.get("body")
        if not body:
            raise CustomException(
                 error_message=f"Health Indicator Input does not have "
                               f"classifiedLoadCollective.body which is mandatory.",
                               metadata=self.hi_component
                 )

        counts = body.get("counts")
        if not counts:
            raise CustomException(
                 error_message=f"Health Indicator Input does not have "
                               f"classifiedLoadCollective.body.counts which is mandatory.",
                               metadata=self.hi_component
                 )

        countsList = counts.get("countsList")
        if (not countsList or not isinstance(countsList, list)):
            raise CustomException(
                 error_message=f"Health Indicator Input does not have "
                               f"classifiedLoadCollective.body.counts.countsList array which is mandatory.",
                               metadata=self.hi_component
                 )
        countsListCount = len(countsList)

        LOGGER.info(f"Got {countsListCount} counts.")

        classes = body.get("classes")
        if (not classes or not isinstance(classes, list)):
            raise CustomException(
                 error_message=f"Health Indicator Input does not have "
                               f"classifiedLoadCollective.body.classes array which is mandatory.",
                               metadata=self.hi_component
                 )

        classesCount= len(classes)

        if (channelsCount!=classesCount):
            errors.append(f"{channelsCount} channels, but {classesCount} classes")

        for clazz in classes:

            className = clazz.get("className")
            if not className:
               errors.append(f"A class has no name which is mandatory")

            classList = clazz.get("classList")
            if (not classList or not isinstance(classList, list)):
              errors.append(f"Class {className} has no classList array which is mandatory")
            else:
              classListCount=len(classList)

              LOGGER.info(f"Got {classListCount} classes for class {className}.")

              if (classListCount!=countsListCount):
                errors.append(f"Class {className} has {classListCount} entries, but there are {countsListCount} counts.")

        for meta_field in ["adaptionValueList"]:
            if not self.hi_data.get(meta_field):
                errors.append(f"{meta_field}")

        return errors

    def mock_response(self):
        """
        This method is used to get mock response
        
        Returns: result is a mock response

        """

        random.seed(self.hi_hash)

        result = {
			"version" : "VER_AV_001",
			"componentId" : self.hi_component,
			"healthIndicatorValues" : [random.random(),random.random()] 	
		}
        return result
