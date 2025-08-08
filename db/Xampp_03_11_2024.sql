-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 03, 2024 lúc 02:53 PM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `management_booking`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `account`
--

CREATE TABLE `account` (
  `id` int(11) NOT NULL,
  `userName` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `score` int(11) DEFAULT 0,
  `password` varchar(255) NOT NULL,
  `role` tinyint(4) NOT NULL,
  `phoneNumber` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `account`
--

INSERT INTO `account` (`id`, `userName`, `email`, `score`, `password`, `role`, `phoneNumber`) VALUES
(2, 'admin', 'admin@gmail.com', 1000, '$2b$10$5lDLnOF0ZXAhBo8pr3ySnOqnndvdH8v4lQm7UWJcByeeSoQWbIMuW', 0, '123456'),
(6, 'Nhatdeptrai', 'Nhatdeptrai@gmail.com', 0, '$2b$10$cvf7QAxVfFoSdfRSb8b.2OKuKsbjS5ZKM2AeVNlP3oL5xaoHwJAr6', 2, '123456'),
(12, 'baoquoczero@gmail.com', 'baoquoczero@gmail.com', 0, '$2b$10$ecBf5HFbdlBomsKPOM1lMulsTY1Hmzs4lcvPowkUO4Gq/h8bG7hWW', 2, '0372701722');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `booking`
--

CREATE TABLE `booking` (
  `id` int(11) NOT NULL,
  `bookingName` varchar(100) NOT NULL,
  `userIdBooking` int(11) NOT NULL,
  `bookingPhone` varchar(20) NOT NULL,
  `checkInDate` date NOT NULL,
  `checkOutDate` date NOT NULL,
  `bookingRoomId` int(11) DEFAULT NULL,
  `bookingStatus` tinyint(4) DEFAULT 0,
  `paymentStatus` int(11) DEFAULT 0,
  `paymentMethod` int(11) DEFAULT 0,
  `surcharge` decimal(10,2) DEFAULT 0.00,
  `totalFee` decimal(20,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `booking`
--

INSERT INTO `booking` (`id`, `bookingName`, `userIdBooking`, `bookingPhone`, `checkInDate`, `checkOutDate`, `bookingRoomId`, `bookingStatus`, `paymentStatus`, `paymentMethod`, `surcharge`, `totalFee`) VALUES
(19, '2312312', 2, '12313123', '2024-10-01', '2024-10-14', NULL, 0, 0, 1, 1.00, 1.00);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `roomId` int(11) DEFAULT NULL,
  `hotelId` int(11) DEFAULT NULL,
  `rating` decimal(2,1) DEFAULT 0.0,
  `comment` text DEFAULT NULL,
  `is_removed` tinyint(4) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `hotel`
--

CREATE TABLE `hotel` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `rating` decimal(2,1) DEFAULT 0.0,
  `description` text DEFAULT NULL,
  `totalRooms` int(11) DEFAULT 0,
  `reviewScore` decimal(2,1) DEFAULT 0.0,
  `image` text DEFAULT NULL,
  `createdDate` datetime DEFAULT current_timestamp(),
  `updatedDate` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `hotel`
--

INSERT INTO `hotel` (`id`, `name`, `location`, `rating`, `description`, `totalRooms`, `reviewScore`, `image`, `createdDate`, `updatedDate`) VALUES
(7, 'Pandoru', 'Sao Hỏa', 5.0, 'Nơi chúng ta ở, chỉ có không khí, Một trang giấy đặt sai chỗ, nó không có ở đó. Trong khoảng không nơi dữ liệu phai mờ, Những câu hỏi còn đó, câu trả lời thì lẩn tránh. Không phải mọi con đường đều dẫn đến nơi chúng ta quan tâm.', 2147483647, 9.9, '6dfa6768-8eeb-42b0-8060-37a8f11772b8.jpg', '2024-11-02 21:19:49', '2024-11-03 20:39:34'),
(8, 'UwU', '?', 5.0, 'Vị trí trang cần có, Khoảng trống và thiếu từ— Một khoảng trống trong mã.', 2000000000, 5.0, 'c170381c-c014-4754-b14a-b5b14e857f29.png', '2024-11-03 12:01:10', '2024-11-03 20:39:40'),
(9, '(O_O)', '404', 5.0, 'Trong cái nóng ban ngày, Con đường tan biến thành hư không— Một ảo ảnh trống rỗng.', 546546546, 9.9, '0266fae1-42da-4783-9fd0-d2952d26bc6d.webp', '2024-11-03 12:03:29', '2024-11-03 20:39:47');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `news`
--

CREATE TABLE `news` (
  `id` int(11) NOT NULL,
  `topic` varchar(100) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `newsImage` text DEFAULT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `news`
--

INSERT INTO `news` (`id`, `topic`, `title`, `newsImage`, `description`) VALUES
(2, 'Cây Đèn Giao Thông Tự Tin Nhất Thế Giới', 'Giao thông', 'https://static.tuoitre.vn/tto/i/s626/2012/05/23/0wQS2In3.jpg', 'Một cây đèn giao thông ở thành phố XYZ vừa tuyên bố sẽ không còn bật đèn đỏ nữa vì “tôi quá nổi tiếng và không muốn ai phải chờ đợi”. Người dân cho biết họ rất hào hứng với ý tưởng này, nhưng cũng lo lắng về việc giao thông có thể trở nên hỗn loạn hơn.'),
(3, 'Lợn Vào Quán Cà Phê Gây Náo Loạn', 'Giải trí', 'https://sohanews.sohacdn.com/2017/1-1512584166031-1512619511163.png', 'Một con lợn đáng yêu đã bất ngờ chạy vào một quán cà phê ở trung tâm thành phố và yêu cầu một ly cappuccino. Chủ quán đã quyết định phục vụ nó với một ly nước, nhưng lợn đã từ chối và nói: “Tôi chỉ muốn một trải nghiệm cà phê thực sự!”'),
(4, 'Trái Đất Không Tồn Tại: Những Bằng Chứng Mới Đầy Thuyết Phục', 'Khoa học', 'https://e7.pngegg.com/pngimages/957/391/png-clipart-rage-comic-internet-meme-iphone-4s-desktop-meme-comics-face-thumbnail.png', 'Trong một cuộc hội thảo khoa học gây tranh cãi vừa diễn ra, một nhóm các nhà nghiên cứu đã đưa ra một tuyên bố gây sốc rằng Trái đất thực chất không tồn tại. Theo họ, mọi hình ảnh và video mà chúng ta thấy về hành tinh xanh chỉ là một sản phẩm của trí tưởng tượng và công nghệ chỉnh sửa hiện đại.\n\nNhóm nghiên cứu này đã công bố \"Báo cáo Thực Tế Ảo\" với những lý lẽ như: không có ai thực sự đi du lịch đến Trái đất, và tất cả các video về không gian chỉ là một chuỗi các đoạn phim được tạo ra bởi các nhà khoa học hàng đầu để che giấu sự thật. Họ khẳng định rằng các tấm ảnh chụp Trái đất từ không gian đều được quay tại một studio lớn ở Hollywood.\n\n“Nếu bạn nghĩ về nó, không có ai từng thực sự thấy Trái đất,” một thành viên trong nhóm cho biết. “Tất cả chúng ta chỉ đang sống trong một trò chơi thực tế ảo khổng lồ mà chúng ta gọi là cuộc sống.”\n\nBáo cáo đã thu hút sự quan tâm lớn từ giới truyền thông và mạng xã hội, với nhiều người bày tỏ sự hoài nghi, trong khi một số khác thì hoàn toàn đồng tình với tuyên bố gây sốc này. “Thật đáng sợ khi nghĩ rằng chúng ta có thể chỉ là những nhân vật trong một trò chơi không có điểm dừng,” một người dùng Twitter bình luận.\n\nCác nhà khoa học khác đã nhanh chóng bác bỏ những tuyên bố này, cho rằng đây chỉ là một trò đùa hoặc một chiến dịch gây rối. Tuy nhiên, cuộc tranh cãi về sự tồn tại của Trái đất vẫn tiếp tục nóng lên, với ngày càng nhiều người tò mò về thực hư của những thông tin này.');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `promotions`
--

CREATE TABLE `promotions` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `discount` decimal(5,2) NOT NULL,
  `description` text DEFAULT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `createdDate` datetime DEFAULT current_timestamp(),
  `updatedDate` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `promotions`
--

INSERT INTO `promotions` (`id`, `name`, `discount`, `description`, `startDate`, `endDate`, `createdDate`, `updatedDate`) VALUES
(3, 'Giảm giá cho người Sao Hỏa', 99.00, 'Giảm giá cho người Sao Hỏa', '2024-11-02', '3000-11-01', '2024-11-02 21:20:33', '2024-11-02 21:20:33');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `rooms`
--

CREATE TABLE `rooms` (
  `id` int(11) NOT NULL,
  `image` text DEFAULT NULL,
  `price` bigint(20) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `roomtypeId` int(11) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `statusRooms` varchar(255) NOT NULL,
  `hotelId` int(11) DEFAULT NULL,
  `createdDate` datetime DEFAULT current_timestamp(),
  `updatedDate` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `rooms`
--

INSERT INTO `rooms` (`id`, `image`, `price`, `description`, `location`, `roomtypeId`, `name`, `statusRooms`, `hotelId`, `createdDate`, `updatedDate`) VALUES
(17, '805fea29-e2b2-4955-8f0f-b736fbfb11f5.jfif', 9000000, 'Sao Hỏa hay Hỏa Tinh là hành tinh thứ tư ở Hệ Mặt Trời và là hành tinh đất đá ở xa Mặt Trời nhất, với bán kính bé thứ hai so với các hành tinh khác. Sao Hoả có màu cam đỏ do bề mặt của hành tinh được bao phủ bởi lớp vụn sắt(III) oxit, do đó còn có tên gọi khác là \"hành tinh đỏ\". ', 'Sao Hỏa', 7, 'Standard Room', '', 7, '2024-11-02 21:23:56', '2024-11-03 20:48:05'),
(18, '805fea29-e2b2-4955-8f0f-b736fbfb11f5.jfif', 5000000, 'Family Room', 'Sao Hỏa', 10, 'Family Room', '', 7, '2024-11-03 20:49:52', '2024-11-03 20:49:52'),
(19, '45b5e5d9-f72d-4f58-9b38-4c531399e6ba.jpg', 99000000, 'Triple Room', 'Sao Hỏa', 9, 'Triple Room', '', 8, '2024-11-03 20:50:30', '2024-11-03 20:50:30'),
(20, '664511e6-bc81-4ea3-96f3-a18d085c4597.jfif', 112000000, 'Standard VIP', 'Sao Hỏa', 8, 'Standard VIP', '', 9, '2024-11-03 20:51:50', '2024-11-03 20:51:50');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `roomtypes`
--

CREATE TABLE `roomtypes` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(100) DEFAULT NULL,
  `createdDate` datetime DEFAULT current_timestamp(),
  `updatedDate` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `roomtypes`
--

INSERT INTO `roomtypes` (`id`, `name`, `description`, `createdDate`, `updatedDate`) VALUES
(7, 'Standard', 'Standard', '2024-11-02 21:20:07', '2024-11-03 20:40:21'),
(8, 'Standard VIP', 'Standard VIP', '2024-11-03 20:47:06', '2024-11-03 20:47:06'),
(9, 'Triple Room', 'Triple Room', '2024-11-03 20:47:16', '2024-11-03 20:47:16'),
(10, 'Family Room', 'Family Room', '2024-11-03 20:47:25', '2024-11-03 20:47:25');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `room_promotions`
--

CREATE TABLE `room_promotions` (
  `roomId` int(11) NOT NULL,
  `promotionId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `room_promotions`
--

INSERT INTO `room_promotions` (`roomId`, `promotionId`) VALUES
(17, 3),
(18, 3),
(19, 3),
(20, 3);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `room_services`
--

CREATE TABLE `room_services` (
  `roomId` int(11) NOT NULL,
  `serviceId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `room_services`
--

INSERT INTO `room_services` (`roomId`, `serviceId`) VALUES
(17, 3),
(17, 4),
(17, 5),
(17, 6),
(18, 3),
(18, 4),
(18, 5),
(18, 6),
(19, 3),
(19, 4),
(19, 5),
(19, 6),
(20, 3),
(20, 4),
(20, 5),
(20, 6);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `services`
--

CREATE TABLE `services` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `createdDate` datetime DEFAULT current_timestamp(),
  `updatedDate` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `services`
--

INSERT INTO `services` (`id`, `name`, `description`, `icon`, `createdDate`, `updatedDate`) VALUES
(3, 'Ắn sáng', 'Ắn sáng', 'https://luhanhvietnam.com.vn/du-lich/vnt_upload/news/12_2019/nhung-quy-tac-an-uong-ki-la-nhat-the-gioi.jpg', '2024-11-02 21:21:38', '2024-11-03 11:51:45'),
(4, 'Nhà hàng', 'Nhà hàng', 'https://assets.gia-hanoi.com/unnamed-4.png', '2024-11-03 11:52:42', '2024-11-03 11:52:56'),
(5, 'Bãi đỗ xe', 'Bãi đỗ xe', 'https://hethonggiuxethongminhpth.com/wp-content/uploads/2024/01/bai-do-xe-1024x768.webp', '2024-11-03 11:53:31', '2024-11-03 11:53:31'),
(6, 'Thang máy', 'Thang máy', 'https://thegioithangmay.com.vn/wp-content/uploads/2019/09/thang-may-gia-dinh-450kg.jpg', '2024-11-03 11:53:53', '2024-11-03 11:53:53');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bookingRoomId` (`bookingRoomId`),
  ADD KEY `userIdBooking` (`userIdBooking`);

--
-- Chỉ mục cho bảng `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `roomId` (`roomId`),
  ADD KEY `hotelId` (`hotelId`);

--
-- Chỉ mục cho bảng `hotel`
--
ALTER TABLE `hotel`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `promotions`
--
ALTER TABLE `promotions`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`id`),
  ADD KEY `roomtypeId` (`roomtypeId`),
  ADD KEY `hotelId` (`hotelId`);

--
-- Chỉ mục cho bảng `roomtypes`
--
ALTER TABLE `roomtypes`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `room_promotions`
--
ALTER TABLE `room_promotions`
  ADD PRIMARY KEY (`roomId`,`promotionId`),
  ADD KEY `fk_room_promotion_promotion` (`promotionId`);

--
-- Chỉ mục cho bảng `room_services`
--
ALTER TABLE `room_services`
  ADD PRIMARY KEY (`roomId`,`serviceId`),
  ADD KEY `fk_room_service_service` (`serviceId`);

--
-- Chỉ mục cho bảng `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `account`
--
ALTER TABLE `account`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT cho bảng `booking`
--
ALTER TABLE `booking`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT cho bảng `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `hotel`
--
ALTER TABLE `hotel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT cho bảng `news`
--
ALTER TABLE `news`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `promotions`
--
ALTER TABLE `promotions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `rooms`
--
ALTER TABLE `rooms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT cho bảng `roomtypes`
--
ALTER TABLE `roomtypes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `services`
--
ALTER TABLE `services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `booking`
--
ALTER TABLE `booking`
  ADD CONSTRAINT `booking_ibfk_1` FOREIGN KEY (`bookingRoomId`) REFERENCES `rooms` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `booking_ibfk_2` FOREIGN KEY (`userIdBooking`) REFERENCES `account` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `account` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`roomId`) REFERENCES `rooms` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_3` FOREIGN KEY (`hotelId`) REFERENCES `hotel` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `rooms`
--
ALTER TABLE `rooms`
  ADD CONSTRAINT `rooms_ibfk_1` FOREIGN KEY (`roomtypeId`) REFERENCES `roomtypes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `rooms_ibfk_2` FOREIGN KEY (`hotelId`) REFERENCES `hotel` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `room_promotions`
--
ALTER TABLE `room_promotions`
  ADD CONSTRAINT `fk_room_promotion_promotion` FOREIGN KEY (`promotionId`) REFERENCES `promotions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_room_promotion_room` FOREIGN KEY (`roomId`) REFERENCES `rooms` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `room_services`
--
ALTER TABLE `room_services`
  ADD CONSTRAINT `fk_room_service_room` FOREIGN KEY (`roomId`) REFERENCES `rooms` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_room_service_service` FOREIGN KEY (`serviceId`) REFERENCES `services` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
