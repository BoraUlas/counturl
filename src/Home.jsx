import axios from "axios";
import React, { useEffect, useState } from "react";

function Home() {
  //Array oluşturduk API'den gelen verileri tanımlamak için
  const [users, setUsers] = useState([]);
  const [urls, setUrls] = useState([]);

  //Linkleri API'den çektik
  const GetUrls = () => {
    axios
      .get("https://ulasbora-shortlnk-api.onrender.com/url/getall")
      .then(function (response) {
        setUrls(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
//kullanıcıları API'den çektik
  const GetUSers = () => {
    axios
      .get("https://ulasbora-shortlnk-api.onrender.com/user/getall")
      .then(function (response) {
        setUsers(response.data);
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  };

  useEffect(() => {
    GetUSers();
    GetUrls();
  }, []);
  console.log(urls);
  return (
    //Sayfayı tasarladık
    <div>
      <div className="navbar">
        <div className="title">Link Kısalt İstastikleri</div>
      </div>
      <div className="home">
        <div className="urls">
          <h2>En çok tıklananlar</h2>
          <div className="url-bar">
            <div className="content-div">
              <p>Sıralama</p>
            </div>
            <div className="content-div">
              <p>Link</p>
            </div>
            <div className="content-div">
              <p>Tıklanma</p>
            </div>
          </div>
          <div className="urls-list">
            {urls !== null &&
              urls.map((url, i) => (
                <div key={url.ID} className="url-card">
                  <div className="content-div">
                    <p className="arrangement">{i + 1}</p>
                  </div>
                  <div className="content-div">
                    <a
                      href={
                        "https://linkkisalt.netlify.app/url/" +
                        url.ShortenedUrl
                      }
                    >
                      {url.ShortenedUrl}
                    </a>
                  </div>
                  <div className="content-div">
                    <p>{url.ClickCount}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="urls">
          <h2>En çok Link Kısaltanlar</h2>
          <div className="url-bar">
            <div className="content-div">
              <p>Sıralama</p>
            </div>
            <div className="content-div">
              <p>Kullanıcı Adı</p>
            </div>
            <div className="content-div">
              <p>Oluşturulan link</p>
            </div>
          </div>
          <div className="urls-list">
            {users !== null &&
              users.map((user, i) => (
                <div key={user.ID} className="url-card">
                  <div className="content-div">
                    <p className="arrangement">{i + 1}</p>
                  </div>
                  <div className="content-div">
                    <p style={{ overflow: "hidden", width: "50px" }}>
                      {user.UserName}
                    </p>
                  </div>
                  <div className="content-div">
                    <p>{user.UrlCount}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
