-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 07, 2024 at 04:13 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `arco_database`
--

-- --------------------------------------------------------

--
-- Table structure for table `annualreports`
--

CREATE TABLE `annualreports` (
  `report_id` int(11) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `year` int(11) NOT NULL,
  `executive_summary` text DEFAULT NULL,
  `company_achievements` text DEFAULT NULL,
  `financial_statements` text DEFAULT NULL,
  `management_discussion` text DEFAULT NULL,
  `future_outlook` text DEFAULT NULL,
  `created_at` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `annualreports`
--

INSERT INTO `annualreports` (`report_id`, `user_id`, `title`, `year`, `executive_summary`, `company_achievements`, `financial_statements`, `management_discussion`, `future_outlook`, `created_at`) VALUES
(2, 2, 'Annual Report 2023', 2023, 'This is the executive summary.', 'Details about achievements.', 'Summary of financial statements.', 'Management\'s discussion and analysis.', 'The future outlook for the company.', '2024-05-03'),
(4, 2, 'ARCO ANNUAL ', 2023, 'This is the executive summary. In 2023, our company achieved significant milestones and navigated various challenges. Thislevel overview of our performance throughout the year, highlighting key achievements, financial results, and future prospects.', 'Details about achievements. In 2023, our company experienced remarkable growth and success across various fronts. Some notable achievements include:\n\nExpansion into New Markets: We successfully entered three new markets, increasing our customer base by 25%.\nProduct Launches: We launched two innovative products, gaining significant traction and positive customer feedback.\nCustomer Satisfaction: Our customer satisfaction scores increased by 15% compared to the previous year, demonstrating our commitment to quality and customer service.', 'Summary of financial statements. Our financial performance in 2023 was strong, with steady revenue growth and improved profitability. Below is a brief summary of our key financial indicators:\n\nRevenue: Our total revenue for 2023 was $100 million, a 20% increase from the previous year.\nNet Income: We reported a net income of $10 million, reflecting a solid profit margin.\nOperating Expenses: Our operating expenses were well-managed, contributing to a leaner cost structure.', 'Management\'s discussion and analysis. Our management team reviewed our performance and discussed key factors that influenced our results in 2023. The following are some of the key points from their analysis:', 'The future outlook for the company. As we look ahead to 2024 and beyond, we are optimistic about our prospects. Our strategic plans focus on the following areas:\n\nContinued Innovation: We will continue to invest in research and development to create cutting-edge products that meet evolving customer needs.\nGlobal Expansion: We aim to expand into new international markets, leveraging our existing strengths and partnerships.\nSustainability and Social Responsibility: We are committed to sustainability and plan to implement environmentally friendly practices throughout our operations.', '2024-05-03'),
(5, 2, 'Test DB', 1995, 'This is the', 'kdfksh', 'jkskdfhks', 'kjhsdkjhfks', 'kjhskjdhfk', '2024-05-07'),
(6, 2, 'Test1234', 2024, 'This is a test 123', 'test1234', 'Test', 'test', 'tsert', '2024-05-07');

-- --------------------------------------------------------

--
-- Table structure for table `collage`
--

CREATE TABLE `collage` (
  `collage_id` int(11) NOT NULL,
  `report_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `collage`
--

INSERT INTO `collage` (`collage_id`, `report_id`, `user_id`, `image_path`) VALUES
(1, 73, 1, '/uploads/images/phpED74.tmp'),
(2, 73, 1, 'C:\\xampp\\htdocs\\arco2\\images/php9196.tmp'),
(3, 73, 1, 'C:\\xampp\\htdocs\\arco2\\images/Conceptual Model.png'),
(4, 73, 1, 'C:\\xampp\\htdocs\\arco2\\images/heart.png'),
(5, 73, 1, 'C:\\xampp\\htdocs\\arco2\\images/heart.png'),
(6, 74, 1, 'C:\\xampp\\htdocs\\arco2\\images/heart.png'),
(7, 74, 1, 'C:\\xampp\\htdocs\\arco2\\images/heart.png'),
(8, 74, 1, 'C:\\xampp\\htdocs\\arco2\\images/download.jpg'),
(9, 74, 1, 'C:\\xampp\\htdocs\\arco2\\images/download.jpg'),
(10, 74, 1, 'C:\\xampp\\htdocs\\arco2\\images/download.jpg'),
(11, 74, 1, 'C:\\xampp\\htdocs\\arco2\\images/download.jpg'),
(12, 74, 1, 'C:\\xampp\\htdocs\\arco2\\images/435528680_996283328688806_1297148758723490885_n.jpg'),
(13, 74, 1, 'C:\\xampp\\htdocs\\arco2\\images/USE CASE.png'),
(14, 74, 1, 'C:\\xampp\\htdocs\\arco2\\images/DFD.png'),
(15, 74, 1, 'C:\\xampp\\htdocs\\arco2\\images/It\'s showtime - Page 1.png'),
(16, 74, 1, 'C:\\xampp\\htdocs\\arco2\\images/SALT SOLUTIONS BG.png'),
(17, 74, 1, 'C:\\xampp\\htdocs\\arco2\\images/SALT SOLUTIONS BG.png'),
(18, 74, 1, 'C:\\xampp\\htdocs\\arco2\\images/SALT SOLUTIONS BG.png'),
(19, 74, 1, 'C:\\xampp\\htdocs\\arco2\\images/SALT SOLUTIONS BG.png'),
(20, 74, 1, 'C:\\xampp\\htdocs\\arco2\\images/SALT SOLUTIONS BG.png'),
(21, 74, 1, 'C:\\xampp\\htdocs\\arco2\\images/435528680_996283328688806_1297148758723490885_n.jpg'),
(22, 74, 1, 'C:\\xampp\\htdocs\\arco2\\images/VIRTUAL BG.png'),
(23, 74, 1, 'C:\\Users\\RED\\Documents\\ARCO-FINAL-REPO\\Copy\\src\\assets/Blank diagram - Page 1.png'),
(24, 75, 1, 'C:\\xampp\\htdocs\\arco2\\images/DFD.png'),
(25, 76, 1, 'C:\\xampp\\htdocs\\arco2\\images/Blank diagram - Page 1.png'),
(26, 77, 1, 'C:\\xampp\\htdocs\\arco2\\images/jake-nackos-MLK-Wa6FbEE-unsplash.jpg'),
(27, 78, 1, 'C:\\xampp\\htdocs\\arco2\\images/jake-nackos-MLK-Wa6FbEE-unsplash.jpg'),
(28, 79, 1, 'C:\\xampp\\htdocs\\arco2\\images/Big ol\' Orange Head! 🍊 #morningscribbles.jpg'),
(29, 80, 1, 'C:\\xampp\\htdocs\\arco2\\images/Big ol\' Orange Head! 🍊 #morningscribbles.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `eventexpenses`
--

CREATE TABLE `eventexpenses` (
  `expense_id` bigint(20) UNSIGNED NOT NULL,
  `event_id` bigint(20) UNSIGNED NOT NULL,
  `expense_item` varchar(255) NOT NULL,
  `expense_amount` decimal(10,2) NOT NULL,
  `expense_item1` varchar(255) DEFAULT NULL,
  `expense_amount1` int(11) DEFAULT NULL,
  `expense_item2` varchar(255) DEFAULT NULL,
  `expense_amount2` int(11) DEFAULT NULL,
  `expense_item3` varchar(255) DEFAULT NULL,
  `expense_amount3` int(11) DEFAULT NULL,
  `expense_item4` varchar(255) DEFAULT NULL,
  `expense_amount4` int(11) DEFAULT NULL,
  `expense_item5` varchar(255) DEFAULT NULL,
  `expense_amount5` int(11) DEFAULT NULL,
  `expense_item6` varchar(255) DEFAULT NULL,
  `expense_amount6` int(11) DEFAULT NULL,
  `expense_item7` varchar(255) DEFAULT NULL,
  `expense_amount7` int(11) DEFAULT NULL,
  `expense_item8` varchar(255) DEFAULT NULL,
  `expense_amount8` int(11) DEFAULT NULL,
  `expense_item9` varchar(255) DEFAULT NULL,
  `expense_amount9` int(11) DEFAULT NULL,
  `expense_item10` varchar(255) DEFAULT NULL,
  `expense_amount10` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `eventexpenses`
--

INSERT INTO `eventexpenses` (`expense_id`, `event_id`, `expense_item`, `expense_amount`, `expense_item1`, `expense_amount1`, `expense_item2`, `expense_amount2`, `expense_item3`, `expense_amount3`, `expense_item4`, `expense_amount4`, `expense_item5`, `expense_amount5`, `expense_item6`, `expense_amount6`, `expense_item7`, `expense_amount7`, `expense_item8`, `expense_amount8`, `expense_item9`, `expense_amount9`, `expense_item10`, `expense_amount10`) VALUES
(1, 1, 'Array', 0.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(2, 1, 'Array', 0.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(3, 1, 'the', 100.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(4, 1, 'the', 100.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(5, 1, 'the', 100.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(6, 1, 'the', 100.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(7, 1, 'the', 100.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(8, 1, 'the', 100.00, NULL, NULL, 'hero', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(9, 1, 'the', 100.00, NULL, NULL, 'hero', 390, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `eventreports`
--

CREATE TABLE `eventreports` (
  `event_id` bigint(20) UNSIGNED NOT NULL,
  `event_name` varchar(255) DEFAULT NULL,
  `event_date` date DEFAULT NULL,
  `event_title` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `expected_participants` int(11) DEFAULT NULL,
  `total_participants` int(11) DEFAULT NULL,
  `summary` text DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `eventreports`
--

INSERT INTO `eventreports` (`event_id`, `event_name`, `event_date`, `event_title`, `address`, `expected_participants`, `total_participants`, `summary`, `user_id`, `created_at`, `updated_at`) VALUES
(1, 'Annual Conference', '2024-06-15', 'Tech Innovations 2024', '123 Main St, Tech City', 500, 450, 'An annual conference focusing on technology innovations.', 2, '2024-05-05 06:34:13', '2024-05-05 06:34:13'),
(3, 'Annual Conference', '2024-06-15', 'Tech Innovations 2024', '123 Main St, Tech City', 500, NULL, 'An annual conference focusing on technology innovations.', 2, '2024-05-05 10:14:05', '2024-05-05 10:14:05'),
(5, 'jsgdjfgs', '1929-12-09', 'kjhsdkfjhsk', 'kjhsdjkfhks', 200, 200, 'sdhkfshkfhsh', 2, '2024-05-05 10:28:42', '2024-05-05 10:28:42'),
(6, 'The little red riding hood', '2023-12-05', 'The 50th Anniversary of Gordon College', '#2189 Rizal St. Olongapo City Sports Complex', 5000, 4500, 'The event was successful even though a lot of people tried to sneak inside we were still able to accumulate as much money as we can ', 2, '2024-05-05 15:58:58', '2024-05-05 15:58:58');

-- --------------------------------------------------------

--
-- Table structure for table `flipbook`
--

CREATE TABLE `flipbook` (
  `flipbook_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `report_id` int(11) NOT NULL,
  `collage_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reports`
--

CREATE TABLE `reports` (
  `report_id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` varchar(255) NOT NULL,
  `date_created` date NOT NULL DEFAULT current_timestamp(),
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reports`
--

INSERT INTO `reports` (`report_id`, `title`, `description`, `date_created`, `user_id`) VALUES
(37, 'Test Report', 'This is a test', '2024-03-12', 1),
(38, 'Test Report', 'This is a test', '2024-03-12', 1),
(39, 'dddd', 'ddd', '2024-03-12', 1),
(45, 'Test 123 123', 'File 123 123 test', '2024-03-12', 1),
(46, 'Testing 12344', 'Day light like daylight we daylight like dayligh we do the daylight we do the daylight we do it daylight we do the daylght', '2024-03-12', 1),
(47, 'Presentation Day', 'Presentation 123', '2024-03-12', 1),
(48, 'Asher', 'This is a report', '2024-04-19', 1),
(49, 'Asher', 'This is a report', '2024-04-19', 1),
(50, 'Asher', 'This is a report', '2024-04-19', 1),
(51, 'Asher', 'working', '2024-04-19', 1),
(52, 'jhh', 'jhjhjh', '2024-04-20', 1),
(53, 'Hello', 'Hello this is me ', '2024-04-20', 1),
(54, 'Hello World', 'This is me ', '2024-04-20', 1),
(55, 'Asher', 'This is working', '2024-04-20', 1),
(56, 'Hello', 'Can i finally send the data?', '2024-04-20', 1),
(57, 'Pantropiko', 'Ph Pantropiko', '2024-04-20', 1),
(58, 'Pantropiko', 'Ph Pantropiko', '2024-04-20', 1),
(59, 'Anicas', 'Frederick is this', '2024-04-20', 1),
(60, 'October Dump', 'This is the october dump', '2024-04-20', 1),
(61, 'Anicas', 'Frederick S.', '2024-04-20', 1),
(62, 'Anicas', 'Frederick S.', '2024-04-20', 1),
(63, 'Hello ', 'This is fredderick', '2024-04-20', 1),
(64, 'This is', 'This is frederick', '2024-04-20', 1),
(65, 'Test2', 'TestRun@', '2024-04-20', 1),
(66, 'Collage', '1234', '2024-04-20', 1),
(67, 'Running', 'Test Run', '2024-04-20', 1),
(68, '', '', '2024-04-20', 1),
(69, 'This is the form', 'I WANT TO SUBMIT A DATA', '2024-04-20', 1),
(70, 'testtestesttest', 'testtesttest', '2024-04-20', 1),
(71, 'Test555', 'test555', '2024-04-20', 1),
(73, 'Email to asher', 'Email to asher i will be needing to add inputs and data from the hotel and marine', '2024-04-20', 1),
(74, 'Type', 'Script', '2024-04-20', 1),
(75, 'TEST RUN', 'TEST RUNTEST RUN TEST RUN TEST RUNTEST RUNTEST RUNTEST RUNTEST RUNTEST RUNTEST RUNTEST RUNTEST RUNTEST RUNTEST RUNTEST RUNTEST RUNTEST RUNTEST RUNTEST RUNTEST RUNTEST RUN TEST RUNTEST RUN TEST RUN TEST RUNTEST RUNTEST RUNTEST RUNTEST RUNTEST RUNTEST RUNTE', '2024-04-20', 1),
(76, 'Wednesday', 'Report', '2024-04-24', 1),
(77, 'bfffdgdg', 'hfhffhfh', '2024-04-24', 1),
(78, 'k hkh kd', 'kxhckshkdhc', '2024-04-24', 1),
(79, 'test123', 'test123', '2024-04-24', 1),
(80, 'ajhsja', 'jhajsah', '2024-04-24', 1),
(81, 'Asher', 'This is working', '2024-04-27', 1),
(82, 'Asher', 'This is working', '2024-04-27', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `email`, `password`) VALUES
(1, 'edit test', 'admin@gmail.com', '$2y$10$DVR3tqc8YSAGfBe80TU1zeULw0MDyusQ3q1JpugF6Qw'),
(2, 'Asher', 'admin12@gmail.com', '$2y$10$X6./cWNE1JuScPHg7rTm.enWfpmW5WKI1SXMBw3mqFo'),
(105, 'cellphone', 'cellphone@example.com', 'cellphone'),
(106, 'hehe', 'heheh@gmail.com', 'ehheeheh'),
(107, 'jhbjjfhs', 'kshkjfhkshd@gmail.com', 'dhfshd'),
(108, 'uuouiui', 'uihfisi@gmail.com', 'dhfshfshk'),
(109, 'asherjames', 'asherjames@gmail.com', 'asherjames'),
(110, 'asherjameskk', 'asherjameskk@gmail.com', 'jksdhfskjdfk'),
(111, 'admin1234567', 'admin1234567@gmail.com', 'admin1234567');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `annualreports`
--
ALTER TABLE `annualreports`
  ADD PRIMARY KEY (`report_id`),
  ADD KEY `fk_user_id` (`user_id`);

--
-- Indexes for table `collage`
--
ALTER TABLE `collage`
  ADD PRIMARY KEY (`collage_id`),
  ADD KEY `report_id` (`report_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `eventexpenses`
--
ALTER TABLE `eventexpenses`
  ADD PRIMARY KEY (`expense_id`),
  ADD KEY `event_id` (`event_id`);

--
-- Indexes for table `eventreports`
--
ALTER TABLE `eventreports`
  ADD PRIMARY KEY (`event_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `flipbook`
--
ALTER TABLE `flipbook`
  ADD PRIMARY KEY (`flipbook_id`),
  ADD KEY `fk_flipbook_user` (`user_id`),
  ADD KEY `fk_flipbook_report` (`report_id`),
  ADD KEY `fk_flipbook_collage` (`collage_id`);

--
-- Indexes for table `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`report_id`),
  ADD KEY `fk_reports_user` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `annualreports`
--
ALTER TABLE `annualreports`
  MODIFY `report_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `collage`
--
ALTER TABLE `collage`
  MODIFY `collage_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `eventexpenses`
--
ALTER TABLE `eventexpenses`
  MODIFY `expense_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `eventreports`
--
ALTER TABLE `eventreports`
  MODIFY `event_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `flipbook`
--
ALTER TABLE `flipbook`
  MODIFY `flipbook_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `reports`
--
ALTER TABLE `reports`
  MODIFY `report_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=112;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `annualreports`
--
ALTER TABLE `annualreports`
  ADD CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `collage`
--
ALTER TABLE `collage`
  ADD CONSTRAINT `collage_ibfk_1` FOREIGN KEY (`report_id`) REFERENCES `reports` (`report_id`),
  ADD CONSTRAINT `collage_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `eventexpenses`
--
ALTER TABLE `eventexpenses`
  ADD CONSTRAINT `eventexpenses_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `eventreports` (`event_id`) ON DELETE CASCADE;

--
-- Constraints for table `eventreports`
--
ALTER TABLE `eventreports`
  ADD CONSTRAINT `eventreports_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `flipbook`
--
ALTER TABLE `flipbook`
  ADD CONSTRAINT `fk_flipbook_collage` FOREIGN KEY (`collage_id`) REFERENCES `collage` (`collage_id`),
  ADD CONSTRAINT `fk_flipbook_report` FOREIGN KEY (`report_id`) REFERENCES `reports` (`report_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_flipbook_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `reports`
--
ALTER TABLE `reports`
  ADD CONSTRAINT `fk_reports_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
