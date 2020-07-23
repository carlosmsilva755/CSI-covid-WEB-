import React, {useState} from 'react'

import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import TextField from '@material-ui/core/TextField'

export default ({password, setPassword, classname, label}) => {

    const[showPassword, setShowPassword] = useState(false)

    return(

        <div>
            <TextField
                label={label}
                size = "small"
                type={showPassword ? 'text' : 'password'}
                value={password}
                className={classname}
                variant="outlined"
                onChange={event => setPassword(event.target.value)}
                InputProps={{           
                    endAdornment:(
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setShowPassword(!showPassword)}
                                onMouseDown={event => event.preventDefault()}
                                edge="end"
                            >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </div>
    )
}