-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 06, 2024 lúc 11:03 AM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.2.12

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
(5, 'ádsadsad', 'ádasdsad', 123123, '$2b$10$NXz3TtiGv/3/72nQz80UnuUd8PFOwG/ZbWxcqkg58t9DSZD5d2H96', 1, '1234562'),
(6, 'Nhatdeptrai', 'Nhatdeptrai@gmail.com', 0, '$2b$10$cvf7QAxVfFoSdfRSb8b.2OKuKsbjS5ZKM2AeVNlP3oL5xaoHwJAr6', 2, '123456'),
(8, 'áddasdasdasd', 'hehebo2i@gmail.com', 1000, '$2b$10$eeVYuvHeY0sXMKyFbf14k./zcnZYVeQtVsVbDZauB3A1wrDg.GDMG', 1, '123456'),
(9, 'DOI-NO-NHAT', '225688966nhat@gmail.com', 123123123, '$2b$10$o3ryFgyk1SBm/lAtrQ9jrex4c7QrNaCNnZTc1fLpPvY3UAW8WNkFO', 1, '123456'),
(10, 'taikhoanmoitao', 'new@gmail.com', 0, '$2b$10$NOUqlZyxcWtVKhqDasPnle6584lvcxVJJBwq0kxDTH7vXknXz8J6m', 2, '123456'),
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
(1, 'Nguyễn Văn A', 6, '0123456789', '2023-12-29', '2024-12-29', 17, 1, 0, 0, 100.00, 1000000.00),
(2, 'Nguyễn Văn B', 6, '0123456789', '2024-01-29', '2025-01-29', 18, 1, 1, 1, 150.00, 1502000.00),
(3, 'Nguyễn Văn C', 6, '0123456789', '2024-02-28', '2025-02-27', 19, 1, 1, 1, 200.00, 2544000.00),
(4, 'Nguyễn Văn D', 6, '0123456789', '2024-03-29', '2025-03-29', 19, 1, 1, 1, 250.00, 2504000.00),
(5, 'Nguyễn Văn E', 6, '0123456789', '2024-04-28', '2025-04-28', 18, 1, 1, 1, 300.00, 3003440.00),
(6, 'Nguyễn Văn F', 6, '0123456789', '2024-05-30', '2025-05-30', 18, 1, 1, 1, 350.00, 322500.00),
(7, 'Nguyễn Văn G', 6, '0123456789', '2024-06-29', '2025-06-29', 18, 1, 1, 1, 400.00, 400330.00),
(8, 'Nguyễn Văn H', 6, '0123456789', '2024-07-30', '2025-07-30', 17, 1, 1, 1, 450.00, 454500.00),
(9, 'Nguyễn Văn I', 6, '0123456789', '2024-08-30', '2025-08-30', 20, 1, 1, 1, 500.00, 500550.00),
(10, 'Nguyễn Văn J', 6, '0123456789', '2024-09-29', '2025-09-29', 20, 1, 1, 1, 550.00, 550440.00),
(11, 'Nguyễn Văn K', 6, '0123456789', '2024-11-01', '2025-11-01', 17, 1, 1, 1, 600.00, 6000.00),
(12, 'Nguyễn Văn L', 6, '0123456789', '2024-11-30', '2025-11-30', 17, 0, 1, 1, 650.00, 6500.00),
(23, 'Nhatdeptrai', 6, '12313123', '2024-11-11', '2024-11-22', 17, 1, 1, 0, 0.00, 10000000.00),
(24, 'Nguyễn Văn D', 8, '12313123123213', '2024-11-11', '2024-11-22', 20, 1, 0, 0, 0.00, 200000.00),
(61, 'phúc fix', 2, '21312313123', '2024-11-28', '2024-12-01', 18, 1, 0, 0, 0.00, 6000000.00);

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

--
-- Đang đổ dữ liệu cho bảng `comments`
--

INSERT INTO `comments` (`id`, `userId`, `roomId`, `hotelId`, `rating`, `comment`, `is_removed`) VALUES
(1, 5, NULL, NULL, 4.0, 'ádasdadsdasdádasdasdadadasdsa', 0),
(5, 5, 17, 7, 8.9, 'dsdadasdsadadadasd', 0),
(7, 5, 17, 7, 2.0, 'sadasdasdsd', 0),
(9, 6, 17, 7, 6.0, 'sdad', NULL),
(10, 6, NULL, 7, 4.0, NULL, NULL),
(11, 6, NULL, 7, NULL, NULL, NULL);

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
(7, 'Pandoru', 'Sao Hỏa', 5.0, 'Gura', 2147483647, 9.9, 'a8a0bd74-29de-4ec7-96ee-79d2a8cbea91.jfif', '2024-11-02 21:19:49', '2024-11-06 16:47:59'),
(8, 'Pandora', 'Thái dương hệ', 4.0, 'view siêu đẹp', 10, 4.0, 'ad7e9784-5dce-4ff5-8d40-d79c2aa473ee.jfif', '2024-11-03 22:16:32', '2024-11-06 16:48:06'),
(9, 'Orario', 'Thái dương hệ', 3.0, 'ádadasd', 3, 3.0, 'f69892c9-694f-4081-adaa-b71e3da407c6.jfif', '2024-11-03 22:17:16', '2024-11-06 16:50:12');

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
  `statusRooms` varchar(255) NOT NULL DEFAULT '0',
  `hotelId` int(11) DEFAULT NULL,
  `createdDate` datetime DEFAULT current_timestamp(),
  `updatedDate` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `rooms`
--

INSERT INTO `rooms` (`id`, `image`, `price`, `description`, `location`, `roomtypeId`, `name`, `statusRooms`, `hotelId`, `createdDate`, `updatedDate`) VALUES
(17, '136c48a6-24ac-4736-87b4-cd5765b31adc.jfif', 8999999, 'Sao Hỏa hay Hỏa Tinh là hành tinh thứ tư ở Hệ Mặt Trời và là hành tinh đất đá ở xa Mặt Trời nhất, với bán kính bé thứ hai so với các hành tinh khác. Sao Hoả có màu cam đỏ do bề mặt của hành tinh được bao phủ bởi lớp vụn sắt(III) oxit, do đó còn có tên gọi khác là \"hành tinh đỏ\". ', 'Sao Hỏa', 7, 'Siêu Vip', '0', 7, '2024-11-02 21:23:56', '2024-11-06 16:48:22'),
(18, '1e773fdc-ad97-455b-a9eb-83e5663695b3.jfif', 2000000, 'tdasdsadlnaslkd', 'Quận 2', 7, ' Orario super vip', '0', 9, '2024-11-03 23:11:02', '2024-11-06 16:59:21'),
(19, 'c52d08ee-70b5-4e96-9ace-fb72ac3e9a1d.jfif', 2132332, 'ádadasdasdasd', 'Thái dương hệ', 7, 'adasdasdasda', '0', 8, '2024-11-03 23:11:28', '2024-11-06 16:48:42'),
(20, 'f98bed44-348b-4616-a76a-3ee35b2d06bc.jfif', 1232313, 'dsadasdasdasdas', 'sadasdasdad', 7, 'Pandoraádsadasdasdasd', '0', 7, '2024-11-03 23:12:13', '2024-11-06 16:48:46');

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
(7, 'Vip', 'Vip', '2024-11-02 21:20:07', '2024-11-02 21:20:07');

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
(18, 3),
(19, 3),
(20, 3);

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
(3, 'Ắn uống', 'Ắn uống', 'https://luhanhvietnam.com.vn/du-lich/vnt_upload/news/12_2019/nhung-quy-tac-an-uong-ki-la-nhat-the-gioi.jpg', '2024-11-02 21:21:38', '2024-11-02 21:21:38');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT cho bảng `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT cho bảng `services`
--
ALTER TABLE `services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
