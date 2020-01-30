import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { ptBR } from '@material-ui/core/locale';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#b71c1c' },
    secondary: { main: '#3d5afe' },
    white: { main: '#ffffff' },
  },
}, ptBR);

export default theme;
