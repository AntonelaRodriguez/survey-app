import { useState } from "react";
import { useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { pink } from '@mui/material/colors';
import { Button, Checkbox, FormControlLabel, Grid, Box, Typography, TextField, FormHelperText, FormControl, Select, MenuItem, Avatar } from "@mui/material";
import TableChartIcon from '@mui/icons-material/TableChart';

const theme = createTheme({
  palette:{
    primary: {
      main: pink[900],
    },
  }
});

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright ©AntonelaRodriguez, '}
      {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    // measurementId: "G-EQZYCZR7P0"
};

firebase.initializeApp(firebaseConfig);

const Survey = () => {
  const [formState, setFormState] = useState({});
//   const history = useHistory();
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dbRef = firebase.database().ref("responses");
    dbRef.push(formState);
    setFormState({});
    alert("Form submitted!");
    navigate("/responses");
  };

  const jsonData = {
	"items": [
		{
			"type": "text",
			"label": "Nombre completo",
			"name": "full_name",
			"required": true
		},
		{
			"type": "email",
			"label": "Correo electrónico",
			"name": "email",
			"required": true
		},
		{
			"type": "date",
			"label": "Fecha de nacimiento",
			"name": "birth_date",
			"required": true
		},
		{
			"type": "select",
			"label": "¿Cuál es tu país de origen?",
			"name": "country_of_origin",
			"options": [
				{
					"label": "Argentina",
					"value": "argentina"
				},
				{
					"label": "Brasil",
					"value": "brasil"
				},
				{
					"label": "Chile",
					"value": "chile"
				},
				{
					"label": "Colombia",
					"value": "colombia"
				},
				{
					"label": "México",
					"value": "mexico"
				},
				{
					"label": "Perú",
					"value": "peru"
				},
				{
					"label": "Uruguay",
					"value": "uruguay"
				},
				{
					"label": "Venezuela",
					"value": "venezuela"
				}
			],
			"required": true
		},
		{
			"type": "checkbox",
			"label": "¿Acepta los términos y condiciones?",
			"name": "terms_and_conditions",
			"required": true
		},
		{
			"type": "submit",
			"label": "Enviar"
		}
	]
}

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: 'full' }} backgroundColor={'#955460'}>
        <Grid xs display="flex" justifyContent="center" alignItems="center">
        </Grid>
        <Grid item xs={6} sm={8} md={6} elevation={6} backgroundColor={'#fbf2f0'} variant="rounded">
        <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <TableChartIcon />
          </Avatar>
        <Typography marginTop={'1.5rem'} component="h1" variant="h5">
          FILL YOUR INFORMATION
        </Typography>
        <Typography paragraph={true} align="left" marginTop={"1.5rem"}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod neque cupiditate deserunt quia. Enim saepe repudiandae commodi! Libero molestiae facilis consequuntur commodi eius nulla ex, laudantium molestias ut.</Typography>
        <Typography paragraph={true} align="left">Lorem ipsum dolor sit amet consectetur adipisicing elit.</Typography>
        <Typography paragraph={true} align="left">Lorem ipsum dolor sit amet consectetur adipisicing elit.</Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, display: 'flex',
              flexDirection: 'column', alignItems: 'flex-start' }} >
          {jsonData.items.map((item, index) => {
          switch (item.type) {
            case "text":
            case "email":
            case "date":
              return (
              <div key={index}>
                <Box marginTop={'3rem'}>
                <TextField
                  type={item.type}
                  id={item.name}
                  name={item.name}
                  required={item.required}
                  value={formState[item.name] || ""}
                  onChange={handleChange}
                  helperText={item.label}
                  variant="standard"
                  color="primary"
                  focused
                />
                </Box>
              </div>
            );
          case "select":
            return (
              <div key={index}>
                <Box sx={{ minWidth: 120 }} marginTop={'3rem'}>
                <FormControl variant="standard" color="primary" focused>
                <Select
                  value={formState[item.name] || ""}
                  id={item.name}
                  name={item.name}
                  required={item.required}
                  onChange={handleChange}
                  helperText={item.label}
                  
                >
                  <MenuItem value="">Seleccione una opción</MenuItem>
                  {item.options.map((option, index) => (
                    <MenuItem key={index} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{item.label}</FormHelperText>
                </FormControl>
                </Box>
              </div>
            );
          case "checkbox":
            return (
              <div key={index}>
                <Box marginTop={'3rem'}>
                <FormControlLabel
                  control={<Checkbox 
                    id={item.name}
                    name={item.name}
                    required={item.required}
                    checked={formState[item.name]}
                    onChange={(e) =>
                      setFormState((prevState) => ({
                        ...prevState,
                        [item.name]: e.target.checked,
                      }))
                    }
                    size="small"
                  />}
                  label={item.label}
                />
                </Box>
              </div>
            );
          case "submit":
            return (
              <Box marginTop={'1rem'}>
              <Button variant="contained" color="primary" key={index} type="submit">
                {item.label}
              </Button>
              </Box>
            );
          default:
            return null;
        }
      })}
      </Box>
      <Copyright sx={{ mt: 2 }}/>
        </Box>
      </Grid>
      <Grid xs display="flex" justifyContent="center" alignItems="center">
      </Grid>
      </Grid>
    </ThemeProvider>
  )
}

export default Survey