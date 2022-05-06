import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { AiFillDelete } from "react-icons/ai";
import { MdAddCircleOutline } from "react-icons/md";
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';


const ManageInventory = () => {
    const [products, setProducts] = useState([]);
    const [user] = useAuthState(auth);
    useEffect(() => {
        const url = `http://localhost:5000/products`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setProducts(data);
            })
    }, []);

    const handleDeleteItem = (id) => {
        const proceed = window.confirm('Are you sure to delete ?');
        if (proceed) {
            const url = `http://localhost:5000/products/${id}`;
            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    const remaining = products.filter(pd => pd._id !== id);
                    setProducts(remaining);
                })
        }
    }

    return (
        <div className='mt-5 '>
            <div className='d-flex justify-content-end my-3 p-2'>
                <Link to='/additem'><Button variant="primary"><MdAddCircleOutline /> Add New Item</Button></Link>
            </div>
            <table className="table table-success">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Manage</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map(product => {
                            return (
                                <tr key={product._id}>
                                    <td>{product.name}</td>
                                    <td>{product.price} tk</td>
                                    <td>{product.quantity}</td>
                                    <td><button onClick={() => handleDeleteItem(product._id)} type="button" className="btn btn-link"><AiFillDelete /></button></td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
        </div>
    );
};

export default ManageInventory;