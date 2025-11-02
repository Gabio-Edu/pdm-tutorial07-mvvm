import React from 'react';
import { ScrollView } from 'react-native';

import PostList from './components/PostList';

export default function App() {
    return (
        <ScrollView>
            <PostList />
        </ScrollView>
    );
}
