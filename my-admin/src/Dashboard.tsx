import * as React from "react";
import { Card, CardContent, CardHeader } from '@mui/material';
import ApproveButton from "./ApproveButton";

const Dashboard = () => (
    <Card>
        <CardHeader title="Welcome to the administration" />
        <CardContent>Oliver AI85...</CardContent>
        <ApproveButton />
    </Card>
);

export default Dashboard;