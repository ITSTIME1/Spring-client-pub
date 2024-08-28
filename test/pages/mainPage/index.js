import React, { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/MainPage.module.css";
import RepeatedList from "../components/RepeatedList";
import Navbar from "../components/Navbar";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useAuth } from "../../src/context/AuthContext";
import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "../../src/firebaseinitialize";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
import img1 from "@/public/images/img1.png";
import img2 from "@/public/images/img2.png";
import img3 from "@/public/images/img3.png";
import img4 from "@/public/images/img4.png";
import img5 from "@/public/images/img5.png";
import img6 from "@/public/images/img6.png";
import img7 from "@/public/images/img7.png";
import img8 from "@/public/images/img8.png";
import img9 from "@/public/images/img9.png";
import img10 from "@/public/images/img10.png";

const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];

const MainPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [items, setItems] = useState([]); // 여기서 쓰고 있구나
  const [prevItems, setPrevItems] = useState([]);
  const { accessToken } = useAuth();
  const stompClientRef = useRef(null);
  const [socketControl, setSocket] = useState(null);
  const router = useRouter();
  const [storeName, setStoreName] = useState("");
  const [time, setTime] = useState({ minutes: 0, seconds: 0 });
  const [countdownInterval, setCountdownInterval] = useState(null);
  const countdownIntervalRef = useRef(null);

  useEffect(() => {
    // 포그라운드에서 메시지 수신
    onMessage(messaging, (payload) => {
      console.log("Message received in foreground:", payload);

      // 알림 표시
      if (Notification.permission === "granted") {
        const { title, body, icon } = payload.notification || {};

        if (title && body) {
          // React-Toastify를 사용하여 알림 표시
          toast.info(
            <div style={{ display: "flex", alignItems: "center" }}>
              {icon && (
                <img
                  src={icon}
                  alt="icon"
                  style={{ width: 24, height: 24, marginRight: 10 }}
                />
              )}
              <div style={{ marginLeft: 10 }}>
                <strong>{title}</strong>
                <div style={{ marginTop: 5 }}>{body}</div>
              </div>
            </div>,
            {
              position: "top-right",
              autoClose: 10000, // 5초 후 자동 닫힘
            }
          );
        } else {
          console.log("Missing title or body in the notification payload.");
        }
      }
    });
  }, []);

  // Track the previous count values
  const prevCountsRef = useRef([]);
  // Update previous counts
  useEffect(() => {
    prevCountsRef.current = items.map((item) => item.count);
  }, [items]);

  // Sort items only when `count` values change
  useEffect(() => {
    if (items.length > 0) {
      console.log("아이템이 존재, 카운트 설정 시작");
      const prevCounts = prevCountsRef.current;
      const currentCounts = items.map((item) => item.count);

      // Check if any count has changed
      const hasCountChanged = prevCounts.some(
        (count, index) => count !== currentCounts[index]
      );

      if (hasCountChanged) {
        const sortedItems = [...items].sort((a, b) => b.count - a.count); // Sort by count in descending order
        setPrevItems(items);
        setItems(sortedItems);
      }
    }
  }, [items]); // Runs whenever `items` changes

  // Disconnect Notification
  const sendDisconnectNotification = async () => {
    console.log("종료: ", accessToken);
    try {
      const response = await axios.post(
        "https://www.springgreens.store/api/socket/disconnect",
        { channel: "dong" },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        console.log("소켓종료");
        socketControl.close();
      }
      console.log("Disconnect notification sent to server:", response.data);
    } catch (error) {
      console.error("Error sending disconnect notification:", error);
    }
  };

  // Handle Timer End
  // 메인 페이지 시간 설정 및, 상품 정렬
  // const sortItem = useCallback(() => {
  //   setPrevItems(items); // 이전 상품들을 설정해서
  //   setItems(
  //     (prevItems) =>
  //       prevItems
  //         .map((item) => ({
  //           ...item,
  //           // 분과 초를 결합하여 조회수로 설정 (분 * 60 + 초) 또는 원하는 계산법 사용 가능
  //           count: 0,
  //         }))
  //         .sort((a, b) => b.count - a.count) // 조회수를 기준으로 정렬
  //   );
  // }, [items]);

  // Disconnect Socket
  const disconnectSocket = useCallback(async () => {
    if (stompClientRef.current) {
      stompClientRef.current.disconnect(() => {
        console.log("STOMP client disconnected manually");
      });
      stompClientRef.current = null;

      const socket = stompClientRef.current?.ws;
      if (socket) {
        socket.close();
      }

      try {
        await sendDisconnectNotification(accessToken);
      } catch (error) {
        console.error("Error sending disconnect notification:", error);
      }
    }
  }, [accessToken]);

  // Update storeName from router query
  useEffect(() => {
  
    if (router.isReady) {
      console.log(
        "메인페이지에서 받는 router.query : ",
        router.query.storeName
      );

      let changeStoreName = null;
      if (
        router.query.storeName == "늘봄타운" ||
        router.query.storeName == "한국교통대학교 중앙도서관"
      ) {
        changeStoreName = "dong";
      }

      if(router.query.storeName == "엠포플러스") {
        changeStoreName = "apm";
      }
      // 성공 알림
      toast.success(changeStoreName + " 상가 채널에 성공적으로 접속했습니다!", {
        position: "top-right",
        autoClose: 5000,
      });
      setStoreName(changeStoreName || "");
    }
  }, [router.isReady, router.query.storeName]);

  // Socket connection - only when storeName is available
  useEffect(() => {
    if (!storeName || stompClientRef.current) {
      console.log("storeName이 아직 설정되지 않았습니다.");
      return;
    }

    const socket = new SockJS("https://www.springgreens.store/ws");
    setSocket(socket);
    const stompClient = Stomp.over(socket);

    const connect = () => {
      console.log("가게이름 ", storeName);
      stompClient.connect(
        { Authorization: `Bearer ${accessToken}`, channelHeader: "dong" },
        (frame) => {
          console.log("Connected: " + frame);

          // 구독과 메세지 콜백
          stompClient.subscribe("/dong", (message) => {
            // 메시지가 수신되면 호출되는 콜백
            // 메세지를 파싱한 다음에, productId랑, viewCount를 업데이트 시키자.
            const data = JSON.parse(message.body);
            console.log("Received message:", data);


            console.log("CallBack받은 ", data.mall_name, data.product_id, data.view_count);
            // 아이템 목록 업데이트
            setItems((prevItems) => {
              const updatedItems = prevItems.map((item) =>
                item.id === data.product_id
                  ? { ...item, count: data.view_count } // viewCount를 업데이트
                  : item
              );
              // count가 많은 순으로 정렬
              const sortedItems = updatedItems.sort((a, b) => b.count - a.count);

              return sortedItems;
            });
            console.log("Message received:", message.body);
          });

          socket.onclose = async (event) => {
            console.log("WebSocket connection closed", event);
            try {
              await sendDisconnectNotification(accessToken);
            } catch (error) {
              console.error("Error sending disconnect notification:", error);
            }
          };

          stompClientRef.current = stompClient;
        },
        (error) => {
          console.error("WebSocket connection error:", error);
        }
      );
    };

    connect();

    return () => {
      disconnectSocket();
    };
  }, [accessToken, disconnectSocket, storeName]);

  // Toggle Menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Generate Items
  // 여기서 아이템을 받아 와야 하는데
  const getItemsFromServer = async () => {
    try {
      // Replace the URL with your actual API endpoint
      const response = await axios.get(
        "https://www.springgreens.store/api/main/get/scheduledProduct/apm",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // 응답 데이터에서 필요한 정보를 추출
      const shops = response.data.data.shop_list;

      // 각 상점의 제품 정보를 추출하여 itemsData를 생성
      const itemsData = shops.flatMap((shop) =>
        shop.product.map((product, index) => {
          // 랜덤 이미지 선택
          const randomImage = images[Math.floor(Math.random() * images.length)];

          return {
            id: product.product_id,
            title: product.product_name,
            price: `${product.product_price}원`, // 가격을 원화로 표시
            count: product.product_view_count, // 또는 다른 필드로 대체 가능
            image: randomImage, // 랜덤 이미지를 아이템 데이터에 추가
          };
        })
      );

      console.log(itemsData);
      // itemsData를 상태에 저장하거나 다른 처리 수행
      setItems(itemsData);
    } catch (error) {
      console.error("Error fetching items from server:", error);
    }

    // 임시용
    // try {
    //   // Create 10 dummy items
    //   const itemsData = Array.from({ length: 10 }, (_, index) => {
    //     const randomImage = images[Math.floor(Math.random() * images.length)];
    //     return {
    //       id: index,
    //       title: `Item ${index + 1}`,
    //       price: `${(index + 1) * 1000}원`,
    //       count: Math.floor(Math.random() * 100),
    //       image: randomImage, // Add image to item data
    //     };
    //   });

    //   // Set the items with the mock data
    //   setItems(itemsData);
    //    // Sort items after fetching
    //   const sortedItems = [...itemsData].sort((a, b) => b.count - a.count);
    //   setItems(sortedItems);
    // } catch (error) {
    //   console.error("Error fetching items from server:", error);
    // }
  };
  // 서버시간을 받아온다.
  // Fetch Time from Server
  // Fetch Time from Server
  const fetchTimeFromServer = async () => {
    try {
      const response = await axios.get(
        "https://www.springgreens.store/api/main/get/remaining_time/apm",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const totalSeconds = response.data;
      console.log("서버 시간 받아오기");

      if (typeof totalSeconds.data !== "number") {
        throw new Error("Total seconds is not a number");
      }

      const minutes = Math.floor(totalSeconds.data / 60);
      const seconds = totalSeconds.data % 60;
      console.log(minutes, seconds);
      setTime({ minutes, seconds });

      // Clear existing interval before setting a new one
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
      }

      // Set up a new interval
      const intervalId = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime.seconds === 0 && prevTime.minutes === 0) {
          
            getItemsFromServer();
            fetchTimeFromServer(); // 0초일 때 새로 시간 받아오기
            return { minutes: 0, seconds: 0 }; // 잠시 타이머를 0으로 설정
          }
          if (prevTime.seconds === 0) {
            return {
              minutes: prevTime.minutes - 1,
              seconds: 59,
            };
          }
          return {
            ...prevTime,
            seconds: prevTime.seconds - 1,
          };
        });
      }, 1000);

      countdownIntervalRef.current = intervalId;
    } catch (error) {
      console.error("Error fetching time from server:", error);
    }
  };
  useEffect(() => {
    getItemsFromServer(); // Fetch items initially
  }, []); // Empty dependency array ensures it runs only once on mount

  useEffect(() => {
    fetchTimeFromServer(); // 서버에서 시간 받아오기

    // 컴포넌트 언마운트 시 인터벌 정리
    return () => {
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
      }
    };
  }, []); // 빈 배열은 컴포넌트가 처음 마운트될 때만 실행되게 함

  const handleItemClick = (itemId) => {
    setItems((prevItems) => {
      // Find the item to update
      const updatedItems = prevItems.map((item) =>
        item.id === itemId
          ? { ...item, count: item.count + 1 } // Increase count by 1
          : item
      );

      // Check if the items have changed before updating state
      const sortedItems = [...updatedItems].sort((a, b) => b.count - a.count); // Re-sort items after update

      // Only set items if there’s a change
      if (JSON.stringify(prevItems) !== JSON.stringify(sortedItems)) {
        // Determine the productId for the clicked item
        const clickedItem = sortedItems.find((item) => item.id === itemId);
        if (clickedItem) {
          console.log("ItemId가 뭐야? ", itemId);
          sendMessage(itemId); // Send message with productId
        }
        return sortedItems;
      }
      return prevItems;
    });
  };

  // socker message
  const sendMessage = (productId) => {
    if (stompClientRef.current) {
      console.log("소켓 sendMessage");
      console.log("어디로 보낼까요? ", storeName, productId);
  
      // 경로 변수 포함하여 메시지 전송
      stompClientRef.current.send(
        `/ws/message/set/scheduledProduct/incrementViewCount/${storeName}/${productId}`, // 경로 변수 포함
        {} // 본문이 없는 메시지 (빈 객체)
      );
      console.log("보냄");
    } else {
      console.error("stompClientRef.current가 초기화되지 않았습니다.");
    }
  };

  return (
    <>
      <ToastContainer />
      <div>
        <div className={styles.container}>
          <div className={styles.topSection}>
            <div className={styles.menuAndLocationWrapper}>
              <button onClick={toggleMenu} className={styles.menuButton}>
                ☰
              </button>
              <div className={styles.myPlaceContainer}>
                <span className={styles.myPlace}>나의 현재 위치</span>
                {storeName && (
                  <span className={styles.myLocationTitle}>동평화시장</span>
                )}
              </div>
            </div>

            <div className={styles.headBox}>
              {storeName && (
                <h3 onClick={sendDisconnectNotification}>
                  동평화시장 추천상품
                </h3>
              )}

              <div className={styles.timerAndRestartWapper}>
                <span>
                  {String(time.minutes).padStart(2, "0")}:
                  {String(time.seconds).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>

          <div className={styles.listSection}>
            <RepeatedList
              items={items}
              prevItems={prevItems}
              onItemClick={handleItemClick}
            />
          </div>

          {menuOpen && (
            <div className={styles.menuContent}>
              <ul className={styles.menuList}>
                <li>메뉴 항목 1</li>
                <li>메뉴 항목 2</li>
                <li>메뉴 항목 3</li>
              </ul>
            </div>
          )}
        </div>
        <Navbar />
      </div>
    </>
  );
};

export default MainPage;
