import React from 'react';
import './App.css';
import {
    BrowserRouter,
    Route,
    Routes
} from 'react-router-dom';
import UsersList from './components/UsersList';
import UserCreateForm from './components/UserCreateForm';
import Layout from './components/Layout';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<UsersList/>}/>
                    <Route path="/create" element={<UserCreateForm/>}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
