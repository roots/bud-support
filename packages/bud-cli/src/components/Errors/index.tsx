import React, {FunctionComponent} from 'react'
import {Box, Text} from 'ink'

interface ErrorProps {
  errors: string[]
}

const Errors: FunctionComponent<ErrorProps> = ({errors}) => (
  <Box flexDirection="column">
    <Box
      flexDirection="column"
      borderColor="red"
      borderStyle="round"
      marginBottom={1}
      padding={1}>
      {errors?.map((err, id) => (
        <Text key={id} wrap="wrap">
          {err}
        </Text>
      ))}
    </Box>
  </Box>
)

export {Errors as default}