import React, { useState } from "react";
import axios from "axios";

const ProfileSetting: React.FC = () => {
    const [name, setName] = useState("");
    const [age, setAge] = useState(0);
    const [sex, setSex] = useState("");

    // 戻るボタンの処理
    const settingback = () => {
        if (window.confirm("変更内容が保存されていません。移動しますか？")) {
            window.location.href = "/setting";
        }
    };

    // リセットボタンの処理
    const reset = () => {
        if (window.confirm("変更内容を破棄しますか？")) {
            window.location.href = "/profile-setting";
        }
    };

    // 保存ボタンの処理
    const handleSubmit = async () => {
        if (window.confirm("保存が完了しました。")) {
            try {
                const response = await axios.post("http://localhost:3001/api/profile", {
                    name,
                    age,
                    sex,
                });
                console.log("Profile saved successfully:", response.data);
                window.location.href = "/setting"; // 保存後にリダイレクト
            } catch (error) {
                console.error("Error saving profile:", error);
            }
        }
    };

    return (
        <div>
            <h1>プロフィール設定</h1>
            <p>
                名前:{" "}
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </p>
            <p>
                年齢:{" "}
                <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                />
            </p>
            <p>
                性別:{" "}
                <input
                    type="text"
                    id="sex"
                    list="sexlist"
                    value={sex}
                    onChange={(e) => setSex(e.target.value)}
                />
                <datalist id="sexlist">
                    <option value="男性" />
                    <option value="女性" />
                    <option value="その他" />
                </datalist>
            </p>
            <div>
                <p>
                    <a href="/setting" onClick={settingback}>
                        戻る
                    </a>
                </p>
                <input type="reset" value={"リセット"} onClick={reset} />
                <input type="button" value={"保存"} onClick={handleSubmit} />
            </div>
        </div>
    );
};

export default ProfileSetting;
