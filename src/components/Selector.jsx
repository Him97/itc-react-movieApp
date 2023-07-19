import React, { useState } from "react";
import { Box, Heading, Button, Menu, MenuButton, MenuList, MenuItem, Checkbox } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'

export default function SelectControlledComponent() {

    const [menuItem, setMenuItem] = useState('')
    const [checkboxState, setCheckboxState] = useState('True')

    const handleSelect = (selectedItem) => {
        setMenuItem(selectedItem);
    }

    return (
        <Box>
            <Heading>Select Controlled Component</Heading>
            <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                    Colors
                </MenuButton>
                <MenuList>
                    <MenuItem onClick={() => handleSelect('Green')}>Green</MenuItem>
                    <MenuItem onClick={() => handleSelect('Red')}>Red</MenuItem>
                    <MenuItem onClick={() => handleSelect('Yellow')}>Yellow</MenuItem>
                </MenuList>
            </Menu>
            <Box>{menuItem}</Box>
            <Checkbox colorScheme='teal' onChange={(e) => setCheckboxState(e.target.checked ? 'True' : 'False')}>{checkboxState}</Checkbox>
        </Box>
    )
}