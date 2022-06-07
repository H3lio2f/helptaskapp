import TextField from "@mui/material/TextField";
import { Container } from "./styles";

const Filter = ({setSearchQuery, handleKeyDown}) => {

  return (
    <Container>
    <TextField
      className="text"
      //onKeyPress={handleKeyDown}
      onKeyDown={handleKeyDown}
      onChange={(e) => {
        setSearchQuery(e.target.value);
      }}
      label="Pesquisar"
      variant="outlined"
      placeholder="Entra com a pesquisa..."
      size="small"
    />
    {/* <IconButton type="submit" aria-label="search">
      <SearchIcon style={{ fill: "blue" }} />
    </IconButton> */}
  </Container>
  )
}

export default Filter;
