import styled from "styled-components";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getRequest } from "@/utils/api";
import { getToken } from "@/utils/localStorage";
import axios from "axios";

const Button = styled.button`
    width: 100%;
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
        let catchedError = true;
        setLoading(true);
        try {
            const response = await axios.get(`/api/farm/getfarm?farmID=${farmID}`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`, // 토큰이 localStorage에 저장되어 있다고 가정
                },
            });
            console.log(response.status);
            if (response.status == 200) {
                const newToken = response.headers['authorization'];
                if (newToken) {
                    localStorage.setItem("access_token", newToken);
                    localStorage.setItem("farmID", String(farmID));
                }
                catchedError = false;
            }
        } catch (error) {
            console.error("농장 데이터를 가져오는데 실패했습니다:", error);
        } finally {
            setLoading(false);
        }
        if(!catchedError) {
            router.push('/data-statistics/temperature');
            console.log("Success");
        }
        else {
            console.log("Failed");
        }
        
    };

    return (
        <Button onClick={handleSelect} disabled={loading}>
            {loading ? "Loading..." : "Select"}
        </Button>
    );
};

export default ProfileSelectButton;
