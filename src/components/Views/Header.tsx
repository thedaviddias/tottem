import React from 'react'
import { Box, Button } from 'grommet'

const Header = () => {
    return (
        <Box
            height="xxsmall"
            direction="row"
            width="full"
            align="center"
            justify="end"
            pad="medium"
        >
            <Box>
                <Button label="About" plain={true} />
            </Box>
        </Box>
    )
}

export default Header
