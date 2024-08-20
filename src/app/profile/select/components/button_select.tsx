import styled from "styled-components";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Button = styled.button`
    width: 7.125rem;
    height: 2.325rem;
    border-radius: 0.625rem;
    background-color: #274C4B;
    font-family: "Pretendard-Regular";
    font-size: 1.25rem;
    color: white;
    vertical-align: middle;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
        background-color: #153130;
    }
`;

interface ProfileSelectButtonProps {
    farmID: number;
}

const ProfileSelectButton: React.FC<ProfileSelectButtonProps> = ({ farmID }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSelect = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/farm/getfarm/?farmID=${farmID}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`, // Assumes token is stored in localStorage
                },
            });

            if (response.status === 200) {
                // Store the retrieved farm data
                const farmData = response.data;
                localStorage.setItem("selectedFarm", JSON.stringify(farmData));

                // Navigate to the temperature statistics page
                router.push('/data-statistics/temperature');
            }
        } catch (error) {
            console.error("Failed to fetch farm data:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button onClick={handleSelect} disabled={loading}>
            {loading ? "Loading..." : "Select"}
        </Button>
    );
};

export default ProfileSelectButton;
