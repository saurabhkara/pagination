import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import fetchStory from "../helper/api";
import Loader from "../components/Loader";
import Card from "../components/Card";
import { AntDesign } from "@expo/vector-icons";
import { useInterval } from "../customHooks/useInterval";

export default function MainScreen() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState("");
  const [request, setRequest] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [searchFlag, setSearchFlag] = useState(false);
  const [filterParam, setFilterParam] = useState("");
  const [sort, setSort] = useState(false);

  // useEffect(() => {
  //   // async function apiCall(page) {
  //   //   if (request === 0) {
  //   //     try {
  //   //       setLoading(true);
  //   //       const data = await fetchStory(page);
  //   //       if (data.status === 200) {
  //   //         setData(data.data.hits);
  //   //       } else {
  //   //         console.log(data.status, data.data);
  //   //         setError("Oops Something went wrong");
  //   //       }
  //   //     } catch (error) {
  //   //       console.log(error.message);
  //   //       setError("Oops Something went wrong");
  //   //     } finally {
  //   //       setLoading(false);
  //   //     }
  //   //   } else {
  //   //     setRequest(request + 1);
  //   //   }
  //   // }

  //   // const interval = setInterval(() => {
  //   //     // apiCall(request);
  //   //     setRequest(request+1)
  //   //     console.log(request);
  //   // }, 10000);
  //   // apiCall(request);

  //   // return () => {
  //   //   clearInterval(interval);
  //   // };

  //   // const interval = setInterval(() => {
  //   //   apiData();
  //   // }, 10000);

  //   apiData();

  //   // return () => {
  //   //   clearInterval(interval);
  //   // };
  // }, []);


  useInterval(apiData,10000);

 

  async function apiData() {
    setLoading(true);
    fetchStory(request)
      .then((res) => {
        if (data.length > 0) {
          console.log(request);
          setData([...data, ...res.data.hits]);
          setRequest(request + 1);
        } else {
          setData(res.data.hits);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError("Oops Something went Wrong");
        setLoading(false);
      });
  }

  const onHandleSearch = () => {
    const res = data.filter((item) => {
      if (filterParam === "title") {
        return item.title.toLowerCase().includes(searchQuery.toLowerCase());
      } else if (filterParam === "author") {
        return item.author.toLowerCase().includes(searchQuery.toLowerCase());
      } else {
        return (
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.author.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
    });
    setSearchResult(res);
    setSearchFlag(true);
  };

  const clearSearchQuery = () => {
    setSearchFlag(false);
    setSearchQuery("");
    setSearchResult([]);
    setFilterParam("");
    setSort(false);
  };

  const onHandleSort = () => {
    const sortedData = data.sort(
      (a, b) => Number(a.created_at_i) - Number(b.created_at_i)
    );
    console.log(sortedData);
    setSearchResult(sortedData);
  };

  return (
    <View style={styles.container}>
      <Text>Task 21-03-2023</Text>
      <StatusBar style="auto" />
      <View style={styles.header}>
        {/* Search */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <View style={styles.inputContainer}>
            <TextInput
              onChangeText={(text) => setSearchQuery(text)}
              style={styles.input}
              placeholder="Search by title"
              value={searchQuery}
            />
            {searchQuery && (
              <AntDesign
                name="closecircleo"
                size={24}
                color="black"
                onPress={clearSearchQuery}
              />
            )}
          </View>
          <TouchableOpacity
            onPress={onHandleSearch}
            style={{
              backgroundColor: "cyan",
              borderRadius: 15,
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}
          >
            <Text>Search</Text>
          </TouchableOpacity>
        </View>
        {/* Filter */}

        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={
              filterParam === "title"
                ? [styles.filter, { backgroundColor: "cyan" }]
                : styles.filter
            }
            onPress={() => {
              setFilterParam("title"), onHandleSearch();
            }}
          >
            <Text>Title</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              filterParam === "author"
                ? [styles.filter, { backgroundColor: "cyan" }]
                : styles.filter
            }
            onPress={() => {
              setFilterParam("author"), onHandleSearch();
            }}
          >
            <Text>Author</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={
              sort
                ? [styles.filter, { backgroundColor: "cyan" }]
                : styles.filter
            }
            onPress={() => {
              setSort(true), onHandleSort();
            }}
          >
            <Text>Older</Text>
          </TouchableOpacity>
        </View>
        <Text style={{ textAlign: "center", fontSize: 14 }}>
          Page No.:{request + 1} Total News:{data.length}{" "}
        </Text>
      </View>
      <View style={styles.flatContainer}>
        {isLoading && data.length === 0 ? (
          <Loader />
        ) : (
          <>
            <FlatList
              ListHeaderComponent={() => <Text>Authenticated News</Text>}
              // ListEmptyComponent={() => (
              //   <Text>Nothing related to this search</Text>
              // )}
              data={searchQuery && searchFlag ? searchResult : data}
              renderItem={(item) => <Card item={item.item} />}
              style={{
                width: "100%",
              }}
              contentContainerStyle={{
                width: "100%",
                alignItems: "center",
              }}
              // onEndReached={() => {
              //   apiData();
              // }}
              // onEndReachedThreshold={0.2}
            />
            {isLoading && <Loader />}
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 35,
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: 'center',
  },
  flatContainer: {
    width: "90%",
    height: "80%",
    alignItems: "center",
    marginHorizontal: "10%",
    padding: 20,
  },
  header: {
    height: "20%",
    width: "90%",
  },
  inputContainer: {
    height: 50,
    width: "60%",
    backgroundColor: "#ededed",
    paddingHorizontal: 5,
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    height: 50,
    flex: 1,
  },
  filterContainer: {
    flexDirection: "row",
    alignSelf: "center",
  },
  filter: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
    backgroundColor: "#e6e6e6",
    width: 120,
    height: 50,
    borderRadius: 10,
    marginHorizontal: 10,
  },
});
