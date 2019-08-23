import React, { useState, useEffect, useCallback } from 'react'; 
import { View, FlatList } from 'react-native'; 
import LazyImage from '../../components/LazyImage';
import { Post, Header, Avatar, Name, Description, Loading } from './styles';

export default function Feed() {
    const [feed, setFeed] = useState([]);  
    const [page, setPage] = useState(1); 
    const [total, setTotal] = useState(0); 
    const [loading, setLoading] = useState(false); 
    const [refreshing, setRefreshing] = useState(false);
    const [viewable, setViewable] = useState([]); 

    async function laodPage(pageNumber = page, shouldRefresh = false) {
        if (total !== 0 && pageNumber > total) return;  
        setLoading(true);
        const response = await fetch(
            // Query params
            `http://localhost:3000/feed?_expand=author&_limit=5&_page=${pageNumber}`
        );
        const data = await response.json(); 
        const totalItems = response.headers.get('X-Total-Count'); 
        setTotal(Math.floor(totalItems / 5)); // total de páginas / 5
        setFeed(shouldRefresh ? data : [...feed, ...data]); 
        setPage(pageNumber + 1);
        setLoading(false); 
    }

    // Carregar o componente assim que for montado
    useEffect(() => {
        laodPage(); 
    }, []);

    async function refreshList() {
        setRefreshing(true); 

        await laodPage(1, true); 

        setRefreshing(false); 
    }

    const handleVisibleChanged = useCallback(({ changed }) => {
        setViewable(changed.map(({ item }) => item.id));
    }, []); 

    return(
        <View>
            <FlatList 
                data={feed}
                keyExtractor={post => String(post.id)}
                onEndReached={() => laodPage()}
                onEndReachedThreshold={0.1} // 10% 
                ListFooterComponent={loading && <Loading />}
                onRefresh={refreshList}
                refreshing={refreshing}
                onViewableItemsChanged={handleVisibleChanged}
                viewabilityConfig={{ viewAreaCoveragePercentThreshold: 10 }}
                renderItem={({ item }) => ( // desestruturar e pegar item
                    <Post>
                        <Header>
                            <Avatar source={{ uri: item.author.avatar }} />
                            <Name>{item.author.name}</Name>
                        </Header>
                        <LazyImage
                            shouldLoad={viewable.includes(item.id)}
                            aspectRatio={item.aspectRatio} 
                            smallSource={{ uri: item.small }}
                            source={{ uri: item.image }} 
                        /> 
                        <Description>
                            <Name>{item.author.name}</Name> { item.description }
                        </Description>
                    </Post> 
                )}
            /> 
        </View>
    );
}

/*

useState -> Para armazenar a informação que vem do Feed da API para dentro do
componente. Precisamos de um estado. 

useEffect -> Precisamos disparar a chamada à API assim que o componente for montado.

obs: localhost android -> adb reverse tcp:3000 tcp:3000

*/ 


