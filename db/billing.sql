-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Aug 29, 2016 at 10:17 AM
-- Server version: 10.1.13-MariaDB
-- PHP Version: 7.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `billing`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`

--
-- Dumping data for table `accounts`
--

-- --------------------------------------------------------

--
-- Table structure for table `contracts`
--

CREATE TABLE `contracts` (
  `id` int(11) NOT NULL,
  `start` varchar(50) NOT NULL,
  `end` varchar(50) NOT NULL,
  `worker_id` varchar(20) NOT NULL,
  `date_created` varchar(50) NOT NULL,
  `created_by` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `contracts`
--

INSERT INTO `contracts` (`id`, `start`, `end`, `worker_id`, `date_created`, `created_by`) VALUES
(1, 'July 01, 2016', 'January 01, 2017', '1', 'July 29, 2016 12:00:59', '1'),
(2, 'July 01, 2016', 'January 01, 2017', '2', 'July 29, 2016 12:02:09', '1'),
(3, 'July 25, 2016', 'December 25, 2016', '3', 'July 30, 2016 08:03:42', '1'),
(4, 'August 04, 2016', 'February 06, 2017', '4', 'August 13, 2016 15:08:43', '1'),
(5, 'August 01, 2016', 'February 01, 2017', '5', 'August 29, 2016 15:45:40', '1');

-- --------------------------------------------------------

--
-- Table structure for table `designations`
--

CREATE TABLE `designations` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `date_created` varchar(50) NOT NULL,
  `created_by` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `designations`
--

INSERT INTO `designations` (`id`, `name`, `date_created`, `created_by`) VALUES
(1, 'PROGRAMMER', 'July 29, 2016 11:59:06', '1'),
(2, 'WATER BOY', 'July 29, 2016 11:59:12', '1'),
(3, 'WAREHOUSE INCHARGE', 'July 29, 2016 11:59:16', '1'),
(4, 'SITE SUPERVISOR', 'July 29, 2016 11:59:23', '1'),
(5, 'LABORER', 'July 29, 2016 11:59:32', '1'),
(6, 'MASON', 'July 29, 2016 11:59:34', '1'),
(7, 'CARPENTER', 'July 29, 2016 11:59:37', '1'),
(8, 'STEELMAN', 'July 29, 2016 11:59:41', '1'),
(9, 'OPERATOR', 'July 29, 2016 11:59:46', '1'),
(10, 'DRIVER', 'July 29, 2016 11:59:49', '1'),
(11, 'COMPUTER REPAIRMAN', 'July 29, 2016 12:00:13', '1');

-- --------------------------------------------------------

--
-- Table structure for table `eci_workers`
--

CREATE TABLE `eci_workers` (
  `id` int(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `fullname` varchar(60) NOT NULL,
  `rpd` varchar(40) NOT NULL,
  `designation` int(11) NOT NULL,
  `site` int(11) NOT NULL,
  `date_hired` varchar(50) NOT NULL,
  `date_created` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `eci_workers`
--

INSERT INTO `eci_workers` (`id`, `fullname`, `rpd`, `designation`, `site`, `date_hired`, `date_created`) VALUES
(1, 'CHRISTIAN DAVE ABINA', '500', 9, 8, 'October 19, 2015', 'July 29, 2016 12:00:59'),
(2, 'ETHAN M. ABINA', '1000', 1, 9, 'July 01, 2016', 'July 29, 2016 12:02:09'),
(3, 'RYAN ABINA', '500', 6, 6, 'July 25, 2016', 'July 30, 2016 08:03:42'),
(4, 'ROMMEL PRAGAS', '500', 4, 1, 'February 04, 2016', 'August 13, 2016 15:08:43'),
(5, 'NICKA VERBA', '700', 4, 9, 'March 01, 2016', 'August 29, 2016 15:45:40');

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

--
-- Dumping data for table `employees`
--

--
-- Table structure for table `licensed_drivers`
--

CREATE TABLE `licensed_drivers` (
  `id` int(11) NOT NULL,
  `exp_date` varchar(50) NOT NULL,
  `worker_id` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `licensed_drivers`
--

INSERT INTO `licensed_drivers` (`id`, `exp_date`, `worker_id`) VALUES
(1, 'October 13, 2016', '2'),
(2, 'July 30, 2016', '1'),
(3, 'September 20, 2017', '3');

-- --------------------------------------------------------


CREATE TABLE `sites` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `date_created` varchar(50) NOT NULL,
  `created_by` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sites`
--

INSERT INTO `sites` (`id`, `name`, `date_created`, `created_by`) VALUES
(1, 'DULAG', 'July 29, 2016 11:58:31', '1'),
(2, 'JARO', 'July 29, 2016 11:58:33', '1'),
(3, 'JULITA', 'July 29, 2016 11:58:35', '1'),
(4, 'BATUH', 'July 29, 2016 11:58:37', '1'),
(5, 'APITONG', 'July 29, 2016 11:58:43', '1'),
(6, 'BYPASS', 'July 29, 2016 11:58:47', '1'),
(7, 'SUHI', 'July 29, 2016 11:58:50', '1'),
(8, 'CAIBAAN', 'July 29, 2016 11:58:52', '1'),
(9, 'TIGBAO', 'July 29, 2016 11:58:59', '1');

-- --------------------------------------------------------

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--

--
-- Indexes for table `contracts`
--
ALTER TABLE `contracts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `designations`
--
ALTER TABLE `designations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `eci_workers`
--
ALTER TABLE `eci_workers`
  ADD PRIMARY KEY (`id`);



--
-- Indexes for table `licensed_drivers`
--
ALTER TABLE `licensed_drivers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sites`
--
ALTER TABLE `sites`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for table `contracts`
--
ALTER TABLE `contracts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `designations`
--
ALTER TABLE `designations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `eci_workers`
--
ALTER TABLE `eci_workers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `licensed_drivers`
--
ALTER TABLE `licensed_drivers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

-- AUTO_INCREMENT for table `sites`
--
ALTER TABLE `sites`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
