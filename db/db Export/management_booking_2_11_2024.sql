-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 02, 2024 lúc 01:02 PM
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
(10, 'taikhoanmoitao', 'new@gmail.com', 0, '$2b$10$NOUqlZyxcWtVKhqDasPnle6584lvcxVJJBwq0kxDTH7vXknXz8J6m', 2, '123456');

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
(19, '2312312', 2, '12313123', '2024-10-01', '2024-10-14', 13, 0, 0, 1, 1.00, 1.00);

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
(1, 5, 13, 5, 4.0, 'ádasdadsdasdádasdasdadadasdsa', 0);

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
(1, 'khách sạn 2 3', 'Quận 1', 5.0, 'ádasdasdasdasd', 100, 5.0, '4508135a-0465-4612-b6b5-042f61de964b.webp', '2024-10-17 10:02:03', '2024-10-26 16:39:30'),
(2, 'Tsadasdasd', 'Quận 1', 5.0, NULL, 500000, 5.0, 'd121024c-0c59-4d92-8890-38cf71f7876f.jfif', '2024-10-17 10:03:58', '2024-10-24 14:32:17'),
(5, 'khach san 1', 'sádasd', 1.0, NULL, 123, 2.0, '1c5ef060-89d9-44b2-855c-6d344c7ddd97.jpg', '2024-10-17 17:38:27', '2024-10-24 14:32:25'),
(6, 'khách sạn 1', 'hcm', 5.0, 'sadasdasd', 100, 5.0, 'ef623fac-6f1c-44d7-9bed-2cfc0332f9d5.jfif', '2024-10-24 15:06:52', '2024-10-24 15:06:52');

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
(1, 'ádasdas', 20.00, 'ádasdasd', '2024-10-03', '2024-10-26', '2024-10-19 16:41:46', '2024-10-19 16:43:16');

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
  `hotelId` int(11) DEFAULT NULL,
  `createdDate` datetime DEFAULT current_timestamp(),
  `updatedDate` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `rooms`
--

INSERT INTO `rooms` (`id`, `image`, `price`, `description`, `location`, `roomtypeId`, `name`, `hotelId`, `createdDate`, `updatedDate`) VALUES
(13, '75bb1c4f-5721-4230-a058-20438bbe4afd.jpg', 123213, 'ádasd', 'Quận 1', 5, 'Phòng 1', 2, '2024-10-19 17:20:54', '2024-10-25 09:23:32'),
(14, 'b1fab667-9646-430a-9fd7-9ca15524fafc.jpg', 100000, 'ádasdasd', 'Quận 1', 5, 'Phòng 2', 1, '2024-10-22 10:59:15', '2024-10-25 09:23:53');

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
(5, 'ádsadas', 'dsadasd', '2024-10-19 15:34:12', '2024-10-19 15:34:12'),
(6, 'ádasdasd', 'ádasd', '2024-10-26 16:39:40', '2024-10-26 16:39:40');

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
(13, 1),
(14, 1);

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
(13, 1),
(13, 2),
(14, 1),
(14, 2);

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
(1, 'vòi sen', 'đá', 'đá', '2024-10-19 16:23:10', '2024-10-19 16:24:18'),
(2, 'Bãi đỗ xe', 'ádsad', 'ádsad', '2024-10-22 10:52:20', '2024-10-22 10:52:20');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `news`
--
ALTER TABLE `news`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `promotions`
--
ALTER TABLE `promotions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `rooms`
--
ALTER TABLE `rooms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT cho bảng `roomtypes`
--
ALTER TABLE `roomtypes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `services`
--
ALTER TABLE `services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
