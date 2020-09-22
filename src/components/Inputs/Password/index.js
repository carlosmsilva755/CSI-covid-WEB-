import React, {useState} from 'react'

import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import TextField from '@material-ui/core/TextField'

export default ({password, setPassword, classname, label, id, error, errorMessage, setError, disable}) => {

    const[showPassword, setShowPassword] = useState(false)

    return(

        <div>
            <TextField id={id+'-input'}
                disabled={disable}
                error={error}
                label={error ? errorMessage: label}
                size = "small"
                type={showPassword ? 'text' : 'password'}
                value={password}
                className={classname}
                variant="outlined"
                onChange={event => {
                    setPassword(event.target.value); 
                    setError ? setError(false) : console.log('')
                }}
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