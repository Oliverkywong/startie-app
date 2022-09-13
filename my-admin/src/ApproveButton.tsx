import * as React from 'react';
import { useState } from 'react';
import { useNotify, useRedirect, Button } from 'react-admin';

const ApproveButton = () => {
    const redirect = useRedirect();
    const notify = useNotify();
    const [loading, setLoading] = useState(false);
    const handleClick = async() => {
        setLoading(true);
        const updatedRecord:any = {};
        const res = await fetch(`http://localhost:8000/team`
        )
            // .then(() => {
            //     notify('Comment approved');
            //     redirect('/');
            // })
            // .catch((e) => {
            //     notify('Error: comment not approved', { type: 'warning' })
            // })
            // .finally(() => {
            //     setLoading(false);
            // });
            console.log(res);
            const json = await res.json();
            console.log(json);
        json.map((data:any) => {return (data.name)})

    };
    return <Button label="Approve" onClick={handleClick} disabled={loading} />;
};

export default ApproveButton;