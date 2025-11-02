import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';

interface IPost {
    id: string;
    title: string;
    body: string;
}

export default function PostList() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [posts, setPosts] = useState<IPost[]>([]);

    useEffect(() => {
        const loadPosts = async () => {
            setLoading(true);
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/posts');
                const data = await response.json();
                setPosts(data);
            } catch (err) {
                setError('Erro ao carregar os posts');
            } finally {
                setLoading(false);
            }
        };

        loadPosts();
    }, []);

    if (loading)
        return (
            <View style={styles.containerSpinner}>
                <ActivityIndicator size="large" color="#00ff00" />
                <Text>Carregando</Text>
            </View>
        );

    if (error) return <Text>{error}</Text>;

    return (
        <View style={styles.container}>
            {posts.map((post) => (
                <View key={post.id} style={styles.card}>
                    <Text style={styles.title}>{post.title}</Text>
                    <Text style={styles.body}>{post.body}</Text>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerSpinner: {
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        padding: 15,
        margin: 15,
        display: 'flex',
        flexDirection: 'column',
        width: '80%',
        borderRadius: 5,
        backgroundColor: '#f0f0f0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    body: {
        fontSize: 14,
        color: '#555',
    },
});
