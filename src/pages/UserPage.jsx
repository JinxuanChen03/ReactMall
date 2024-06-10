import React from 'react';
import HeadPic from "../components/UserHead";
import MiddleCard from "../components/UserMiddleCard";
import VerticalCard from "../components/UserVerticalCard";
import BottomNav from "../components/BottomNav";

const UserPage = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }} className="scrollable-content">
            <div style={{ position: 'relative', top: '40px', left: '40px'}}>
                <HeadPic/>
            </div>
            <div style={{ position: 'relative', marginTop: '80px'}}>
                <MiddleCard />
            </div>
            <div>
                <VerticalCard />
            </div>
            <div>
                <BottomNav />
            </div>
        </div>
    );
}

export default UserPage;