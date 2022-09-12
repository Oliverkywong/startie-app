import * as React from 'react';
import { useState } from 'react';
import { useNotify, useRedirect, Button } from 'react-admin';

const ApproveButton = () => {
    const redirect = useRedirect();
    const notify = useNotify();
    const [loading, setLoading] = useState(false);
    const handleClick = () => {
        setLoading(true);
        const updatedRecord:any = {username: 'admin', password: 'admin', email: 'admin@gmail.com' };
        fetch(`http://localhost:8000/register`, { method: 'POST',headers:{'Content-Type':'application/json'}, body: JSON.stringify(updatedRecord) })
            .then(() => {
                notify('Comment approved');
                redirect('/');
            })
            .catch((e) => {
                notify('Error: comment not approved', { type: 'warning' })
            })
            .finally(() => {
                setLoading(false);
            });
    };
    return <Button label="Approve" onClick={handleClick} disabled={loading} />;
};

export default ApproveButton;