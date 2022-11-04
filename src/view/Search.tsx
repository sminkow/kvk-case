import { Business, Search } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Input,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import useFetchData, { searchCompanies } from "../api/search";
import { CompanyModel } from "../api/searchModel";
import "./Search.scss";

function SearchPage() {
  const [searchValue, setSearchValue] = useState("");
  const [companies, setCompanies] = useState<CompanyModel[]>([]);
  const { data, loading } = useFetchData("/companies");

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchValue(e.target.value);
  };

  const onSearch = () => {
    searchCompanies(searchValue).then((res) => {
      setCompanies(res.data.data);
    });
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  useEffect(() => {
    setCompanies(data);
  }, [data]);

  return (
    <div className="search-page">
      <Paper
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "60%",
          boxShadow: "none",
        }}
      >
        <Input
          sx={{ ml: 1, flex: 1 }}
          placeholder="Zoek bedrijven"
          inputProps={{ "aria-label": "zoek bedrijven" }}
          onChange={(e) => onChange(e)}
          onKeyDown={(e) => handleKeyDown(e)}
        />
        <IconButton
          onClick={onSearch}
          type="button"
          sx={{ p: "10px" }}
          aria-label="search"
        >
          <Search />
        </IconButton>
      </Paper>
      {loading ? <div>loading...</div> : null}
      <Box
        sx={{ marginTop: "30px", width: "60%", bgcolor: "background.paper" }}
      >
        <List>
          {companies.map((item) => {
            return (
              <ListItem divider={true} key={item.id}>
                <ListItemButton>
                  <ListItemIcon>
                    <Business />
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </div>
  );
}

export default SearchPage;
