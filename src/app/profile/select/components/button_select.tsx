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
            const response = await axios.get(`/api/farm/getfarm?farmID=${farmID}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`, // 토큰이 localStorage에 저장되어 있다고 가정
                },
            });

            if (response.status === 200) {
                // 새로운 토큰을 응답 헤더에서 가져와 저장
                const newToken = response.headers['authorization'];

                if (newToken) {
                    console.log(newToken);
                    localStorage.setItem("access_token", newToken);
                }

                // 온도 통계 페이지로 이동
                router.push('/data-statistics/temperature');
            }
        } catch (error) {
            console.error("농장 데이터를 가져오는데 실패했습니다:", error);
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
