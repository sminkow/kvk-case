import { Business } from "@mui/icons-material";
import {
  Box,
  Button,
  Input,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import useFetchData, { searchCompanies } from "../../api/search";
import { CompanyModel } from "../../api/searchModel";
import "./Search.scss";

import Notification from "../../components/Notification";

function SearchPage() {
  const [searchValue, setSearchValue] = useState("");
  const [companies, setCompanies] = useState<CompanyModel[]>([]);
  const [noResults, setNoResults] = useState(false);
  const [notification, setNotification] = useState(false);
  const { data, loading } = useFetchData("/companies");

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchValue(e.target.value);
  };

  const onSearch = () => {
    searchCompanies(searchValue)
      .then((res) => {
        if (res.data.data.length === 0) {
          setNoResults(true);
        } else {
          setNoResults(false);
        }
        setCompanies(res.data.data);
      })
      .catch((err) => {
        setNotification(true);
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
          sx={{ ml: 1, mr: "10px", flex: 1 }}
          placeholder="Zoek bedrijven"
          inputProps={{ "aria-label": "zoek bedrijven" }}
          onChange={(e) => onChange(e)}
          onKeyDown={(e) => handleKeyDown(e)}
        />
        <Button
          onClick={onSearch}
          type="button"
          sx={{ p: "10px" }}
          aria-label="search"
        >
          Zoeken
        </Button>
      </Paper>
      {loading ? (
        <div>loading...</div>
      ) : (
        <Box
          sx={{
            marginTop: "30px",
            width: "60%",
            bgcolor: "background.paper",
          }}
        >
          <List>
            {noResults ? (
              <ListItem>Geen resultaten</ListItem>
            ) : (
              companies.map((item) => {
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
              })
            )}
          </List>
        </Box>
      )}
      <Notification
        severity={"error"}
        message={"Er is iets misgegaan"}
        open={notification}
      />
    </div>
  );
}

export default SearchPage;
