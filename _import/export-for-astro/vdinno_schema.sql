-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: db.dw234.webglobe.com
-- Generation Time: Jan 11, 2026 at 11:26 AM
-- Server version: 10.5.29-MariaDB-ubu2004-log
-- PHP Version: 8.1.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database schema: `vdinno`
-- Extracted structure only (no data)
--

--
-- Table structure for table `ciselnik_kraj`
--

CREATE TABLE `ciselnik_kraj` (
  `id` int(11) NOT NULL COMMENT 'ID Kraje',
  `kod` varchar(7) NOT NULL COMMENT 'Kód kraje',
  `nazev` varchar(80) NOT NULL COMMENT 'Název kraje',
  `job_kod` varchar(20) NOT NULL COMMENT 'Kód kraje pro jobs'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci COMMENT='Kraj';

--
-- Table structure for table `ciselnik_obec`
--

CREATE TABLE `ciselnik_obec` (
  `id` int(11) NOT NULL COMMENT 'ID obce',
  `kraj_id` int(11) NOT NULL COMMENT 'Kraj',
  `okres_id` int(11) NOT NULL COMMENT 'Okres',
  `kod` varchar(11) NOT NULL COMMENT 'Kód obce',
  `nazev` varchar(80) NOT NULL COMMENT 'Název obce'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci COMMENT='Obec';

--
-- Table structure for table `ciselnik_okres`
--

CREATE TABLE `ciselnik_okres` (
  `id` int(11) NOT NULL COMMENT 'ID okresu',
  `kraj_id` int(11) NOT NULL COMMENT 'Kraj',
  `kod` varchar(9) NOT NULL COMMENT 'Kód okresu',
  `nazev` varchar(80) NOT NULL COMMENT 'Název okresu'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci COMMENT='Okres';

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `source_type` enum('blog',
  'guide',
  'video') NOT NULL DEFAULT 'blog',
  `source_id` int(11) NOT NULL,
  `created` datetime NOT NULL DEFAULT current_timestamp(),
  `updated` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `public` tinyint(1) NOT NULL DEFAULT 0,
  `updatedAdmin` tinyint(1) NOT NULL DEFAULT 0,
  `text` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Table structure for table `course_instruction_email_date`
--

CREATE TABLE `course_instruction_email_date` (
  `course_date_id` int(11) NOT NULL,
  `sent_check_email` datetime DEFAULT NULL,
  `sent_students_list_email` datetime DEFAULT NULL,
  `sent_recording_email` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

--
-- Table structure for table `invoices`
--

CREATE TABLE `invoices` (
  `id` int(11) NOT NULL,
  `subject_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `fakturoid_id` int(11) DEFAULT NULL,
  `fakturoid_vs` varchar(30) DEFAULT NULL,
  `state` enum('prepared',
  'created',
  'paid',
  'overdue',
  'canceled') NOT NULL DEFAULT 'prepared',
  `product_type` enum('ebook',
  'course',
  'courseRecording') NOT NULL DEFAULT 'ebook',
  `product_id` int(11) DEFAULT NULL,
  `variant_id` int(11) NOT NULL DEFAULT 1,
  `fetchapp_sku` varchar(254) DEFAULT NULL,
  `product_name` varchar(254) DEFAULT NULL,
  `product_price` varchar(10) DEFAULT NULL,
  `product_quantity` smallint(6) DEFAULT 1,
  `product_vatrate` smallint(6) DEFAULT 21,
  `discount_base` float NOT NULL DEFAULT 0,
  `discount_amount` float NOT NULL DEFAULT 0,
  `discount_code` varchar(50) DEFAULT NULL,
  `order_create` datetime DEFAULT NULL,
  `order_note` text DEFAULT NULL,
  `last_update` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `attendant_count` smallint(6) DEFAULT NULL,
  `tags` varchar(250) DEFAULT NULL,
  `hash` varchar(250) DEFAULT NULL,
  `invoice_html_url` text DEFAULT NULL,
  `invoice_pdf_url` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` int(11) NOT NULL,
  `showCount` int(11) NOT NULL DEFAULT 0,
  `company` varchar(150) DEFAULT NULL,
  `logoFileName` varchar(100) DEFAULT NULL,
  `companyUrl` varchar(200) DEFAULT NULL,
  `cities` varchar(200) DEFAULT NULL,
  `jobType` varchar(200) NOT NULL,
  `url` varchar(500) DEFAULT NULL,
  `title` varchar(250) NOT NULL,
  `telework` enum('ne',
  'ano') NOT NULL DEFAULT 'ne',
  `createDate` datetime NOT NULL,
  `state` enum('template',
  'ready',
  'published',
  'forbidden',
  'deleted') NOT NULL DEFAULT 'template',
  `approveDate` datetime DEFAULT NULL,
  `deleteDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `group` varchar(100) NOT NULL,
  `file` varchar(100) NOT NULL,
  `checksum` char(32) NOT NULL,
  `executed` datetime NOT NULL,
  `ready` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

--
-- Table structure for table `obsolete_orders`
--

CREATE TABLE `obsolete_orders` (
  `id` int(11) NOT NULL,
  `name` varchar(64) NOT NULL,
  `email` varchar(256) NOT NULL,
  `phone` varchar(32) DEFAULT NULL,
  `note` text DEFAULT NULL,
  `course` text DEFAULT NULL,
  `count` int(11) NOT NULL DEFAULT 1,
  `course_id` int(11) DEFAULT NULL,
  `ico` varchar(15) DEFAULT NULL,
  `dic` varchar(30) DEFAULT NULL,
  `company` varchar(200) DEFAULT NULL,
  `street` varchar(200) DEFAULT NULL,
  `city` varchar(200) DEFAULT NULL,
  `zip` char(5) DEFAULT NULL,
  `discount` text DEFAULT NULL,
  `order_date` datetime DEFAULT NULL,
  `invoice_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Table structure for table `perch2_blogs`
--

CREATE TABLE `perch2_blogs` (
  `blogID` int(10) UNSIGNED NOT NULL,
  `blogTitle` char(255) NOT NULL DEFAULT 'Blog',
  `blogSlug` char(255) DEFAULT 'blog',
  `setSlug` char(255) DEFAULT 'blog',
  `postTemplate` char(255) DEFAULT 'post.html',
  `blogDynamicFields` mediumtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Table structure for table `perch2_blog_authors`
--

CREATE TABLE `perch2_blog_authors` (
  `authorID` int(10) UNSIGNED NOT NULL,
  `authorGivenName` varchar(255) NOT NULL DEFAULT '',
  `authorFamilyName` varchar(255) NOT NULL DEFAULT '',
  `authorEmail` varchar(255) NOT NULL DEFAULT '',
  `authorPostCount` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `authorSlug` varchar(255) NOT NULL DEFAULT '',
  `authorImportRef` varchar(64) DEFAULT NULL,
  `authorDynamicFields` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Table structure for table `perch2_blog_categories`
--

CREATE TABLE `perch2_blog_categories` (
  `categoryID` int(11) NOT NULL,
  `categoryTitle` varchar(255) NOT NULL DEFAULT '',
  `categorySlug` varchar(255) NOT NULL DEFAULT '',
  `categoryPostCount` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `categoryDynamicFields` text DEFAULT NULL,
  `categoryCoreID` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=DYNAMIC;

--
-- Table structure for table `perch2_blog_comments`
--

CREATE TABLE `perch2_blog_comments` (
  `commentID` int(10) UNSIGNED NOT NULL,
  `postID` int(10) UNSIGNED NOT NULL,
  `commentName` varchar(255) NOT NULL DEFAULT '',
  `commentEmail` varchar(255) NOT NULL DEFAULT '',
  `commentURL` varchar(255) NOT NULL DEFAULT '',
  `commentIP` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `commentDateTime` datetime NOT NULL,
  `commentHTML` text NOT NULL,
  `commentStatus` enum('LIVE',
  'PENDING',
  'SPAM',
  'REJECTED') NOT NULL DEFAULT 'PENDING',
  `commentSpamData` text NOT NULL,
  `commentDynamicFields` text NOT NULL,
  `webmention` tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
  `webmentionType` enum('comment',
  'like',
  'repost') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=DYNAMIC;

--
-- Table structure for table `perch2_blog_index`
--

CREATE TABLE `perch2_blog_index` (
  `indexID` int(10) NOT NULL,
  `itemKey` char(64) NOT NULL DEFAULT '-',
  `itemID` int(10) NOT NULL DEFAULT 0,
  `indexKey` char(64) NOT NULL DEFAULT '-',
  `indexValue` char(255) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Table structure for table `perch2_blog_posts`
--

CREATE TABLE `perch2_blog_posts` (
  `postID` int(11) NOT NULL,
  `blogID` int(10) UNSIGNED DEFAULT 1,
  `postTitle` varchar(255) NOT NULL DEFAULT '',
  `postSlug` varchar(255) NOT NULL DEFAULT '',
  `postDateTime` datetime DEFAULT NULL,
  `postDescRaw` text DEFAULT NULL,
  `postDescHTML` text DEFAULT NULL,
  `postDynamicFields` text DEFAULT NULL,
  `postTags` varchar(255) NOT NULL DEFAULT '',
  `postStatus` enum('Published',
  'Draft') NOT NULL DEFAULT 'Published',
  `authorID` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `sectionID` int(10) UNSIGNED NOT NULL DEFAULT 1,
  `postCommentCount` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `postImportID` varchar(64) DEFAULT NULL,
  `postLegacyURL` varchar(255) DEFAULT NULL,
  `postAllowComments` tinyint(1) UNSIGNED NOT NULL DEFAULT 1,
  `postTemplate` varchar(255) NOT NULL DEFAULT 'post.html',
  `postMetaTemplate` varchar(255) NOT NULL DEFAULT 'post_meta.html',
  `postIsPublished` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=DYNAMIC;

--
-- Table structure for table `perch2_blog_posts_to_categories`
--

CREATE TABLE `perch2_blog_posts_to_categories` (
  `postID` int(11) NOT NULL DEFAULT 0,
  `categoryID` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=COMPACT;

--
-- Table structure for table `perch2_blog_posts_to_tags`
--

CREATE TABLE `perch2_blog_posts_to_tags` (
  `postID` int(11) NOT NULL DEFAULT 0,
  `tagID` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=COMPACT;

--
-- Table structure for table `perch2_blog_sections`
--

CREATE TABLE `perch2_blog_sections` (
  `sectionID` int(11) NOT NULL,
  `blogID` int(10) UNSIGNED NOT NULL DEFAULT 1,
  `sectionTitle` varchar(255) NOT NULL DEFAULT '',
  `sectionSlug` varchar(255) NOT NULL DEFAULT '',
  `sectionPostCount` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `sectionDynamicFields` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=DYNAMIC;

--
-- Table structure for table `perch2_blog_tags`
--

CREATE TABLE `perch2_blog_tags` (
  `tagID` int(11) NOT NULL,
  `tagTitle` varchar(255) NOT NULL DEFAULT '',
  `tagSlug` varchar(255) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=DYNAMIC;

--
-- Table structure for table `perch2_blog_webmention_queue`
--

CREATE TABLE `perch2_blog_webmention_queue` (
  `entryID` int(10) UNSIGNED NOT NULL,
  `entryCreated` timestamp NOT NULL DEFAULT '1999-12-31 23:00:00',
  `entrySource` char(255) NOT NULL DEFAULT '',
  `entryTarget` char(255) NOT NULL DEFAULT '',
  `entryType` enum('post',
  'comment') NOT NULL DEFAULT 'post',
  `entryFK` int(10) NOT NULL DEFAULT 0
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Table structure for table `perch2_categories`
--

CREATE TABLE `perch2_categories` (
  `catID` int(10) NOT NULL,
  `setID` int(10) UNSIGNED NOT NULL,
  `catParentID` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `catTitle` char(64) NOT NULL DEFAULT '',
  `catSlug` char(64) NOT NULL DEFAULT '',
  `catPath` char(255) NOT NULL DEFAULT '',
  `catDisplayPath` char(255) NOT NULL DEFAULT '',
  `catOrder` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `catTreePosition` char(255) NOT NULL DEFAULT '000',
  `catDynamicFields` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Table structure for table `perch2_category_counts`
--

CREATE TABLE `perch2_category_counts` (
  `countID` int(10) UNSIGNED NOT NULL,
  `catID` int(10) UNSIGNED NOT NULL,
  `countType` char(64) NOT NULL DEFAULT '',
  `countValue` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Table structure for table `perch2_category_sets`
--

CREATE TABLE `perch2_category_sets` (
  `setID` int(10) NOT NULL,
  `setTitle` char(64) NOT NULL DEFAULT '',
  `setSlug` char(64) NOT NULL DEFAULT '',
  `setTemplate` char(255) NOT NULL DEFAULT 'set.html',
  `setCatTemplate` char(255) NOT NULL DEFAULT 'category.html',
  `setDynamicFields` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Table structure for table `perch2_content_index`
--

CREATE TABLE `perch2_content_index` (
  `indexID` int(10) NOT NULL,
  `itemID` int(10) NOT NULL DEFAULT 0,
  `regionID` int(10) NOT NULL DEFAULT 0,
  `pageID` int(10) NOT NULL DEFAULT 0,
  `itemRev` int(10) NOT NULL DEFAULT 0,
  `indexKey` char(64) NOT NULL DEFAULT '-',
  `indexValue` char(255) NOT NULL DEFAULT ''
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Table structure for table `perch2_content_items`
--

CREATE TABLE `perch2_content_items` (
  `itemRowID` int(10) UNSIGNED NOT NULL,
  `itemID` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `regionID` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `pageID` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `itemRev` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `itemOrder` int(10) UNSIGNED NOT NULL DEFAULT 1000,
  `itemJSON` mediumtext NOT NULL,
  `itemSearch` mediumtext NOT NULL,
  `itemUpdated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `itemUpdatedBy` char(32) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Table structure for table `perch2_content_regions`
--

CREATE TABLE `perch2_content_regions` (
  `regionID` int(10) NOT NULL,
  `pageID` int(10) UNSIGNED NOT NULL,
  `regionKey` varchar(255) NOT NULL DEFAULT '',
  `regionPage` varchar(255) NOT NULL DEFAULT '',
  `regionHTML` longtext NOT NULL,
  `regionNew` tinyint(1) UNSIGNED NOT NULL DEFAULT 1,
  `regionOrder` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `regionTemplate` varchar(255) NOT NULL DEFAULT '',
  `regionMultiple` tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
  `regionOptions` text NOT NULL,
  `regionSearchable` tinyint(1) UNSIGNED NOT NULL DEFAULT 1,
  `regionRev` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `regionLatestRev` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `regionEditRoles` varchar(255) NOT NULL DEFAULT '*',
  `regionPublishRoles` varchar(255) NOT NULL DEFAULT '*',
  `regionUpdated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Table structure for table `perch2_forms`
--

CREATE TABLE `perch2_forms` (
  `formID` int(10) UNSIGNED NOT NULL,
  `formKey` varchar(64) NOT NULL DEFAULT '',
  `formTitle` varchar(255) NOT NULL DEFAULT '',
  `formTemplate` varchar(255) NOT NULL DEFAULT '',
  `formOptions` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Table structure for table `perch2_forms_responses`
--

CREATE TABLE `perch2_forms_responses` (
  `responseID` int(10) UNSIGNED NOT NULL,
  `formID` int(10) UNSIGNED NOT NULL,
  `responseCreated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `responseJSON` mediumtext DEFAULT NULL,
  `responseIP` varchar(16) NOT NULL DEFAULT '',
  `responseSpam` tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
  `responseSpamData` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Table structure for table `perch2_menu_items`
--

CREATE TABLE `perch2_menu_items` (
  `itemID` int(10) UNSIGNED NOT NULL,
  `parentID` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `itemType` enum('menu',
  'app',
  'link') NOT NULL DEFAULT 'app',
  `itemOrder` int(10) UNSIGNED NOT NULL DEFAULT 1,
  `itemTitle` char(64) NOT NULL DEFAULT 'Unnamed item',
  `itemValue` char(255) DEFAULT NULL,
  `itemPersists` tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
  `itemActive` tinyint(1) UNSIGNED NOT NULL DEFAULT 1,
  `privID` int(10) DEFAULT NULL,
  `userID` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `itemInternal` tinyint(1) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Table structure for table `perch2_navigation`
--

CREATE TABLE `perch2_navigation` (
  `groupID` int(10) NOT NULL,
  `groupTitle` varchar(255) NOT NULL DEFAULT '',
  `groupSlug` varchar(255) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Table structure for table `perch2_navigation_pages`
--

CREATE TABLE `perch2_navigation_pages` (
  `navpageID` int(10) UNSIGNED NOT NULL,
  `pageID` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `groupID` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `pageParentID` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `pageOrder` int(10) UNSIGNED NOT NULL DEFAULT 1,
  `pageDepth` tinyint(10) UNSIGNED NOT NULL,
  `pageTreePosition` varchar(64) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Table structure for table `perch2_pages`
--

CREATE TABLE `perch2_pages` (
  `pageID` int(10) UNSIGNED NOT NULL,
  `pageParentID` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `pagePath` varchar(255) NOT NULL DEFAULT '',
  `pageTitle` varchar(255) NOT NULL DEFAULT '',
  `pageNavText` varchar(255) NOT NULL DEFAULT '',
  `pageNew` tinyint(1) UNSIGNED NOT NULL DEFAULT 1,
  `pageOrder` int(10) UNSIGNED NOT NULL DEFAULT 1,
  `pageDepth` tinyint(10) UNSIGNED NOT NULL DEFAULT 0,
  `pageSortPath` varchar(255) NOT NULL DEFAULT '',
  `pageTreePosition` varchar(64) NOT NULL DEFAULT '',
  `pageSubpageRoles` varchar(255) NOT NULL DEFAULT '',
  `pageSubpagePath` varchar(255) NOT NULL DEFAULT '',
  `pageHidden` tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
  `pageNavOnly` tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
  `pageAccessTags` varchar(255) NOT NULL DEFAULT '',
  `pageCreatorID` char(255) NOT NULL DEFAULT '0',
  `pageModified` datetime NOT NULL DEFAULT '2014-01-01 00:00:00',
  `pageAttributes` text NOT NULL,
  `pageAttributeTemplate` varchar(255) NOT NULL DEFAULT 'default.html',
  `pageTemplate` char(255) NOT NULL DEFAULT '',
  `templateID` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `pageSubpageTemplates` varchar(255) NOT NULL DEFAULT '',
  `pageCollections` varchar(255) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Table structure for table `perch2_page_templates`
--

CREATE TABLE `perch2_page_templates` (
  `templateID` int(10) UNSIGNED NOT NULL,
  `templateTitle` varchar(255) NOT NULL DEFAULT '',
  `templatePath` varchar(255) NOT NULL DEFAULT '',
  `optionsPageID` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `templateReference` tinyint(1) UNSIGNED NOT NULL DEFAULT 1,
  `templateNavGroups` varchar(255) DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Table structure for table `perch2_resources`
--

CREATE TABLE `perch2_resources` (
  `resourceID` int(10) UNSIGNED NOT NULL,
  `resourceApp` char(32) NOT NULL DEFAULT 'content',
  `resourceBucket` char(16) NOT NULL DEFAULT 'default',
  `resourceFile` char(255) NOT NULL DEFAULT '',
  `resourceKey` enum('orig',
  'thumb') DEFAULT NULL,
  `resourceParentID` int(10) NOT NULL DEFAULT 0,
  `resourceType` char(4) NOT NULL DEFAULT '',
  `resourceCreated` datetime NOT NULL DEFAULT '2000-01-01 00:00:00',
  `resourceUpdated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `resourceAWOL` tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
  `resourceTitle` char(255) DEFAULT NULL,
  `resourceFileSize` int(10) UNSIGNED DEFAULT NULL,
  `resourceWidth` int(10) UNSIGNED DEFAULT NULL,
  `resourceHeight` int(10) UNSIGNED DEFAULT NULL,
  `resourceCrop` tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
  `resourceDensity` float NOT NULL DEFAULT 1,
  `resourceTargetWidth` int(10) UNSIGNED DEFAULT NULL,
  `resourceTargetHeight` int(10) UNSIGNED DEFAULT NULL,
  `resourceMimeType` char(64) DEFAULT NULL,
  `resourceInLibrary` tinyint(1) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Table structure for table `perch2_resources_to_tags`
--

CREATE TABLE `perch2_resources_to_tags` (
  `resourceID` int(10) NOT NULL DEFAULT 0,
  `tagID` int(10) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=COMPACT;

--
-- Table structure for table `perch2_resource_log`
--

CREATE TABLE `perch2_resource_log` (
  `logID` int(10) UNSIGNED NOT NULL,
  `appID` char(32) NOT NULL DEFAULT 'content',
  `itemFK` char(32) NOT NULL DEFAULT 'itemRowID',
  `itemRowID` int(10) UNSIGNED NOT NULL,
  `resourceID` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Table structure for table `perch2_resource_tags`
--

CREATE TABLE `perch2_resource_tags` (
  `tagID` int(10) NOT NULL,
  `tagTitle` varchar(255) NOT NULL DEFAULT '',
  `tagSlug` varchar(255) NOT NULL DEFAULT '',
  `tagCount` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=DYNAMIC;

--
-- Table structure for table `perch2_settings`
--

CREATE TABLE `perch2_settings` (
  `settingID` varchar(60) NOT NULL DEFAULT '',
  `userID` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `settingValue` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Table structure for table `perch2_users`
--

CREATE TABLE `perch2_users` (
  `userID` int(10) UNSIGNED NOT NULL,
  `userUsername` varchar(255) NOT NULL DEFAULT '',
  `userPassword` varchar(255) NOT NULL DEFAULT '',
  `userCreated` datetime NOT NULL DEFAULT '2000-01-01 00:00:00',
  `userUpdated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `userLastLogin` datetime NOT NULL DEFAULT '2000-01-01 00:00:00',
  `userGivenName` varchar(255) NOT NULL DEFAULT '',
  `userFamilyName` varchar(255) NOT NULL DEFAULT '',
  `userEmail` varchar(255) NOT NULL DEFAULT '',
  `userEnabled` tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
  `userHash` char(32) NOT NULL DEFAULT '',
  `roleID` int(10) UNSIGNED NOT NULL DEFAULT 1,
  `userMasterAdmin` tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
  `userPasswordToken` char(255) NOT NULL DEFAULT 'expired',
  `userPasswordTokenExpires` datetime NOT NULL DEFAULT '2015-01-01 00:00:00',
  `userLastFailedLogin` datetime DEFAULT NULL,
  `userFailedLoginAttempts` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Table structure for table `perch2_user_passwords`
--

CREATE TABLE `perch2_user_passwords` (
  `passwordID` int(10) UNSIGNED NOT NULL,
  `userID` int(10) UNSIGNED NOT NULL,
  `userPassword` varchar(255) NOT NULL DEFAULT '',
  `passwordLastUsed` datetime NOT NULL DEFAULT '2000-01-01 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Table structure for table `perch2_user_privileges`
--

CREATE TABLE `perch2_user_privileges` (
  `privID` int(10) UNSIGNED NOT NULL,
  `privKey` varchar(255) NOT NULL DEFAULT '',
  `privTitle` varchar(255) NOT NULL DEFAULT '',
  `privOrder` int(10) UNSIGNED NOT NULL DEFAULT 99
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Table structure for table `perch2_user_roles`
--

CREATE TABLE `perch2_user_roles` (
  `roleID` int(10) UNSIGNED NOT NULL,
  `roleTitle` varchar(255) NOT NULL DEFAULT '',
  `roleSlug` varchar(255) NOT NULL DEFAULT '',
  `roleMasterAdmin` tinyint(1) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Table structure for table `perch2_user_role_privileges`
--

CREATE TABLE `perch2_user_role_privileges` (
  `roleID` int(10) UNSIGNED NOT NULL,
  `privID` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Table structure for table `prices`
--

CREATE TABLE `prices` (
  `id` int(11) NOT NULL DEFAULT 1,
  `order` int(11) NOT NULL DEFAULT 1,
  `description` varchar(200) NOT NULL,
  `text` varchar(200) NOT NULL,
  `price` decimal(10,
  2) NOT NULL DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `surname` varchar(50) NOT NULL,
  `course_id` int(11) DEFAULT NULL,
  `course_date_id` int(11) DEFAULT NULL,
  `course_name` varchar(255) NOT NULL,
  `course_date` date DEFAULT NULL,
  `course_inhouse` tinyint(4) NOT NULL DEFAULT 0,
  `feedback_hash` varchar(50) NOT NULL,
  `course_score` smallint(6) DEFAULT NULL,
  `course_opinion` text DEFAULT NULL,
  `course_proposals` text DEFAULT NULL,
  `request_date` datetime DEFAULT NULL,
  `reminder_date` datetime DEFAULT NULL,
  `feedback_date` datetime DEFAULT NULL,
  `instructions_date` datetime DEFAULT NULL,
  `recording_date` datetime DEFAULT NULL,
  `recording_view_date` datetime DEFAULT NULL,
  `publicity` tinyint(4) NOT NULL DEFAULT 1,
  `activity` tinyint(4) NOT NULL DEFAULT 1,
  `invoices_id` int(11) DEFAULT NULL,
  `email_cc` varchar(50) DEFAULT NULL,
  `note` text DEFAULT NULL,
  `price` decimal(8,
  2) DEFAULT NULL,
  `recordingPassword` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

--
-- Table structure for table `subjects`
--

CREATE TABLE `subjects` (
  `id` int(11) NOT NULL,
  `fakturoid_id` int(11) DEFAULT NULL,
  `email` varchar(200) NOT NULL,
  `name` varchar(200) NOT NULL,
  `street` varchar(200) DEFAULT NULL,
  `city` varchar(200) DEFAULT NULL,
  `zip` char(5) DEFAULT NULL,
  `country` char(3) NOT NULL DEFAULT 'CZE',
  `phone` varchar(50) DEFAULT NULL,
  `ico` varchar(15) DEFAULT NULL,
  `dic` varchar(30) DEFAULT NULL,
  `company` varchar(200) DEFAULT NULL,
  `delivery_address` smallint(1) NOT NULL DEFAULT 0,
  `delivery_name` varchar(200) DEFAULT NULL,
  `delivery_street` varchar(200) DEFAULT NULL,
  `delivery_city` varchar(200) DEFAULT NULL,
  `delivery_zip` char(5) DEFAULT NULL,
  `delivery_country` char(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `role` varchar(20) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `surname` varchar(100) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `company` varchar(200) DEFAULT NULL,
  `street` varchar(200) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `zip` varchar(20) DEFAULT NULL,
  `country` varchar(3) DEFAULT NULL,
  `ic` varchar(20) DEFAULT NULL,
  `dic` varchar(20) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `modified_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Table structure for table `user_hash`
--

CREATE TABLE `user_hash` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `email` varchar(200) NOT NULL,
  `hash` varchar(200) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `modified_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Table structure for table `webhooks`
--

CREATE TABLE `webhooks` (
  `id` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `fakturoid_id` int(11) DEFAULT NULL,
  `invoice_id` int(11) DEFAULT NULL,
  `result_code` int(11) NOT NULL DEFAULT 500,
  `fetchapp_message` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ciselnik_kraj`
--
ALTER TABLE `ciselnik_kraj`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ciselnik_obec`
--
ALTER TABLE `ciselnik_obec`
  ADD PRIMARY KEY (`id`),
  ADD KEY `kraj_id` (`kraj_id`),
  ADD KEY `okres_id` (`okres_id`);

--
-- Indexes for table `ciselnik_okres`
--
ALTER TABLE `ciselnik_okres`
  ADD PRIMARY KEY (`id`),
  ADD KEY `kraj_id` (`kraj_id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `parent_id` (`parent_id`),
  ADD KEY `source_id` (`source_id`),
  ADD KEY `created` (`created`);

--
-- Indexes for table `course_instruction_email_date`
--
ALTER TABLE `course_instruction_email_date`
  ADD PRIMARY KEY (`course_date_id`);

--
-- Indexes for table `invoices`
--
ALTER TABLE `invoices`
  ADD PRIMARY KEY (`id`),
  ADD KEY `subject_id` (`subject_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `type_file` (`group`;

--
-- Indexes for table `obsolete_orders`
--
ALTER TABLE `obsolete_orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `invoice_id` (`invoice_id`);

--
-- Indexes for table `perch2_blogs`
--
ALTER TABLE `perch2_blogs`
  ADD PRIMARY KEY (`blogID`);

--
-- Indexes for table `perch2_blog_authors`
--
ALTER TABLE `perch2_blog_authors`
  ADD PRIMARY KEY (`authorID`);

--
-- Indexes for table `perch2_blog_categories`
--
ALTER TABLE `perch2_blog_categories`
  ADD PRIMARY KEY (`categoryID`),
  ADD KEY `idx_slug` (`categorySlug`);

--
-- Indexes for table `perch2_blog_comments`
--
ALTER TABLE `perch2_blog_comments`
  ADD PRIMARY KEY (`commentID`);

--
-- Indexes for table `perch2_blog_index`
--
ALTER TABLE `perch2_blog_index`
  ADD PRIMARY KEY (`indexID`),
  ADD KEY `idx_fk` (`itemKey`,
  ADD KEY `idx_key` (`indexKey`),
  ADD KEY `idx_key_val` (`indexKey`,
  ADD KEY `idx_keys` (`itemKey`;

--
-- Indexes for table `perch2_blog_posts`
--
ALTER TABLE `perch2_blog_posts`
  ADD PRIMARY KEY (`postID`),
  ADD KEY `idx_date` (`postDateTime`),
  ADD KEY `idx_status` (`postStatus`) USING BTREE,
  ADD KEY `idx_blog` (`blogID`) USING BTREE;

--
-- Indexes for table `perch2_blog_posts_to_categories`
--
ALTER TABLE `perch2_blog_posts_to_categories`
  ADD PRIMARY KEY (`postID`;

--
-- Indexes for table `perch2_blog_posts_to_tags`
--
ALTER TABLE `perch2_blog_posts_to_tags`
  ADD PRIMARY KEY (`postID`;

--
-- Indexes for table `perch2_blog_sections`
--
ALTER TABLE `perch2_blog_sections`
  ADD PRIMARY KEY (`sectionID`),
  ADD KEY `idx_slug` (`sectionSlug`);

--
-- Indexes for table `perch2_blog_tags`
--
ALTER TABLE `perch2_blog_tags`
  ADD PRIMARY KEY (`tagID`);

--
-- Indexes for table `perch2_blog_webmention_queue`
--
ALTER TABLE `perch2_blog_webmention_queue`
  ADD PRIMARY KEY (`entryID`);

--
-- Indexes for table `perch2_categories`
--
ALTER TABLE `perch2_categories`
  ADD PRIMARY KEY (`catID`),
  ADD KEY `idx_set` (`setID`);

--
-- Indexes for table `perch2_category_counts`
--
ALTER TABLE `perch2_category_counts`
  ADD PRIMARY KEY (`countID`),
  ADD KEY `idx_cat` (`catID`),
  ADD KEY `idx_cat_type` (`countType`;

--
-- Indexes for table `perch2_category_sets`
--
ALTER TABLE `perch2_category_sets`
  ADD PRIMARY KEY (`setID`);

--
-- Indexes for table `perch2_content_index`
--
ALTER TABLE `perch2_content_index`
  ADD PRIMARY KEY (`indexID`),
  ADD KEY `idx_key` (`indexKey`),
  ADD KEY `idx_val` (`indexValue`),
  ADD KEY `idx_rev` (`itemRev`),
  ADD KEY `idx_item` (`itemID`),
  ADD KEY `idx_keyval` (`indexKey`,
  ADD KEY `idx_regrev` (`regionID`;

--
-- Indexes for table `perch2_content_items`
--
ALTER TABLE `perch2_content_items`
  ADD PRIMARY KEY (`itemRowID`),
  ADD KEY `idx_item` (`itemID`),
  ADD KEY `idx_rev` (`itemRev`),
  ADD KEY `idx_region` (`regionID`),
  ADD KEY `idx_regrev` (`itemID`,
  ADD KEY `idx_order` (`itemOrder`);

--
-- Indexes for table `perch2_content_regions`
--
ALTER TABLE `perch2_content_regions`
  ADD PRIMARY KEY (`regionID`),
  ADD KEY `idx_key` (`regionKey`) USING BTREE,
  ADD KEY `idx_path` (`regionPage`) USING BTREE;

--
-- Indexes for table `perch2_forms`
--
ALTER TABLE `perch2_forms`
  ADD PRIMARY KEY (`formID`),
  ADD KEY `idx_formKey` (`formKey`);

--
-- Indexes for table `perch2_forms_responses`
--
ALTER TABLE `perch2_forms_responses`
  ADD PRIMARY KEY (`responseID`),
  ADD KEY `idx_formID` (`formID`),
  ADD KEY `idx_spam` (`responseSpam`);

--
-- Indexes for table `perch2_menu_items`
--
ALTER TABLE `perch2_menu_items`
  ADD PRIMARY KEY (`itemID`);

--
-- Indexes for table `perch2_navigation`
--
ALTER TABLE `perch2_navigation`
  ADD PRIMARY KEY (`groupID`);

--
-- Indexes for table `perch2_navigation_pages`
--
ALTER TABLE `perch2_navigation_pages`
  ADD PRIMARY KEY (`navpageID`),
  ADD KEY `idx_group` (`groupID`),
  ADD KEY `idx_page_group` (`pageID`;

--
-- Indexes for table `perch2_pages`
--
ALTER TABLE `perch2_pages`
  ADD PRIMARY KEY (`pageID`),
  ADD KEY `idx_parent` (`pageParentID`),
  ADD KEY `pageModified` (`pageModified`),
  ADD KEY `pageID` (`pageID`);

--
-- Indexes for table `perch2_page_templates`
--
ALTER TABLE `perch2_page_templates`
  ADD PRIMARY KEY (`templateID`);

--
-- Indexes for table `perch2_resources`
--
ALTER TABLE `perch2_resources`
  ADD PRIMARY KEY (`resourceID`),
  ADD UNIQUE KEY `idx_file` (`resourceBucket`,
  ADD KEY `idx_app` (`resourceApp`),
  ADD KEY `idx_key` (`resourceKey`),
  ADD KEY `idx_type` (`resourceType`),
  ADD KEY `idx_awol` (`resourceAWOL`),
  ADD KEY `idx_library` (`resourceInLibrary`),
  ADD KEY `idx_list` (`resourceParentID`;

--
-- Indexes for table `perch2_resources_to_tags`
--
ALTER TABLE `perch2_resources_to_tags`
  ADD PRIMARY KEY (`resourceID`;

--
-- Indexes for table `perch2_resource_log`
--
ALTER TABLE `perch2_resource_log`
  ADD PRIMARY KEY (`logID`),
  ADD UNIQUE KEY `idx_uni` (`appID`,
  ADD KEY `idx_fk` (`itemFK`;

--
-- Indexes for table `perch2_resource_tags`
--
ALTER TABLE `perch2_resource_tags`
  ADD PRIMARY KEY (`tagID`);

--
-- Indexes for table `perch2_settings`
--
ALTER TABLE `perch2_settings`
  ADD PRIMARY KEY (`settingID`;

--
-- Indexes for table `perch2_users`
--
ALTER TABLE `perch2_users`
  ADD PRIMARY KEY (`userID`),
  ADD KEY `idx_enabled` (`userEnabled`);

--
-- Indexes for table `perch2_user_passwords`
--
ALTER TABLE `perch2_user_passwords`
  ADD PRIMARY KEY (`passwordID`),
  ADD KEY `idx_user` (`userID`);

--
-- Indexes for table `perch2_user_privileges`
--
ALTER TABLE `perch2_user_privileges`
  ADD PRIMARY KEY (`privID`),
  ADD UNIQUE KEY `idx_key` (`privKey`);

--
-- Indexes for table `perch2_user_roles`
--
ALTER TABLE `perch2_user_roles`
  ADD PRIMARY KEY (`roleID`);

--
-- Indexes for table `perch2_user_role_privileges`
--
ALTER TABLE `perch2_user_role_privileges`
  ADD PRIMARY KEY (`roleID`;

--
-- Indexes for table `prices`
--
ALTER TABLE `prices`
  ADD PRIMARY KEY (`id`;

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `feedback_hash` (`feedback_hash`),
  ADD KEY `email` (`email`),
  ADD KEY `invoices_id` (`invoices_id`);

--
-- Indexes for table `subjects`
--
ALTER TABLE `subjects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `user_hash`
--
ALTER TABLE `user_hash`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `webhooks`
--
ALTER TABLE `webhooks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `invoice_id` (`invoice_id`);

ALTER TABLE `perch2_blog_posts` ADD FULLTEXT KEY `idx_search` (`postTitle`,`postDescRaw`,`postTags`);

ALTER TABLE `perch2_content_items` ADD FULLTEXT KEY `idx_search` (`itemSearch`);

ALTER TABLE `perch2_resources` ADD FULLTEXT KEY `idx_search` (`resourceTitle`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ciselnik_kraj`
--
ALTER TABLE `ciselnik_kraj` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID Kraje', AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `ciselnik_obec`
--
ALTER TABLE `ciselnik_obec` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID obce', AUTO_INCREMENT=6253;

--
-- AUTO_INCREMENT for table `ciselnik_okres`
--
ALTER TABLE `ciselnik_okres` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID okresu', AUTO_INCREMENT=78;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `invoices`
--
ALTER TABLE `invoices` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5907;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24348;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations` MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `obsolete_orders`
--
ALTER TABLE `obsolete_orders` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=989;

--
-- AUTO_INCREMENT for table `perch2_blogs`
--
ALTER TABLE `perch2_blogs` MODIFY `blogID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `perch2_blog_authors`
--
ALTER TABLE `perch2_blog_authors` MODIFY `authorID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `perch2_blog_categories`
--
ALTER TABLE `perch2_blog_categories` MODIFY `categoryID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `perch2_blog_index`
--
ALTER TABLE `perch2_blog_index` MODIFY `indexID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49478;

--
-- AUTO_INCREMENT for table `perch2_blog_posts`
--
ALTER TABLE `perch2_blog_posts` MODIFY `postID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=262;

--
-- AUTO_INCREMENT for table `perch2_blog_sections`
--
ALTER TABLE `perch2_blog_sections` MODIFY `sectionID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `perch2_blog_tags`
--
ALTER TABLE `perch2_blog_tags` MODIFY `tagID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `perch2_categories`
--
ALTER TABLE `perch2_categories` MODIFY `catID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `perch2_category_counts`
--
ALTER TABLE `perch2_category_counts` MODIFY `countID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17870;

--
-- AUTO_INCREMENT for table `perch2_category_sets`
--
ALTER TABLE `perch2_category_sets` MODIFY `setID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `perch2_content_index`
--
ALTER TABLE `perch2_content_index` MODIFY `indexID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4130250;

--
-- AUTO_INCREMENT for table `perch2_content_items`
--
ALTER TABLE `perch2_content_items` MODIFY `itemRowID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=433642;

--
-- AUTO_INCREMENT for table `perch2_content_regions`
--
ALTER TABLE `perch2_content_regions` MODIFY `regionID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `perch2_forms`
--
ALTER TABLE `perch2_forms` MODIFY `formID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `perch2_forms_responses`
--
ALTER TABLE `perch2_forms_responses` MODIFY `responseID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=655;

--
-- AUTO_INCREMENT for table `perch2_menu_items`
--
ALTER TABLE `perch2_menu_items` MODIFY `itemID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `perch2_pages`
--
ALTER TABLE `perch2_pages` MODIFY `pageID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `perch2_page_templates`
--
ALTER TABLE `perch2_page_templates` MODIFY `templateID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `perch2_resources`
--
ALTER TABLE `perch2_resources` MODIFY `resourceID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=110;

--
-- AUTO_INCREMENT for table `perch2_resource_log`
--
ALTER TABLE `perch2_resource_log` MODIFY `logID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=463;

--
-- AUTO_INCREMENT for table `perch2_resource_tags`
--
ALTER TABLE `perch2_resource_tags` MODIFY `tagID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `perch2_users`
--
ALTER TABLE `perch2_users` MODIFY `userID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `perch2_user_passwords`
--
ALTER TABLE `perch2_user_passwords` MODIFY `passwordID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `perch2_user_privileges`
--
ALTER TABLE `perch2_user_privileges` MODIFY `privID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT for table `perch2_user_roles`
--
ALTER TABLE `perch2_user_roles` MODIFY `roleID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4034;

--
-- AUTO_INCREMENT for table `subjects`
--
ALTER TABLE `subjects` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5639;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3547;

--
-- AUTO_INCREMENT for table `user_hash`
--
ALTER TABLE `user_hash` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=286;

--
-- AUTO_INCREMENT for table `webhooks`
--
ALTER TABLE `webhooks` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8100;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `ciselnik_obec`
--
ALTER TABLE `ciselnik_obec`
  ADD CONSTRAINT `obec_ibfk_1` FOREIGN KEY (`kraj_id`) REFERENCES `ciselnik_kraj` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `obec_ibfk_2` FOREIGN KEY (`okres_id`) REFERENCES `ciselnik_okres` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `ciselnik_okres`
--
ALTER TABLE `ciselnik_okres`
  ADD CONSTRAINT `okres_ibfk_1` FOREIGN KEY (`kraj_id`) REFERENCES `ciselnik_kraj` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`parent_id`) REFERENCES `comments` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `invoices`
--
ALTER TABLE `invoices`
  ADD CONSTRAINT `invoices_ibfk_1` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`id`) ON DELETE NO ACTION,
  ADD CONSTRAINT `invoices_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `obsolete_orders`
--
ALTER TABLE `obsolete_orders`
  ADD CONSTRAINT `obsolete_orders_ibfk_1` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`id`);

--
-- Constraints for table `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `students_ibfk_1` FOREIGN KEY (`invoices_id`) REFERENCES `invoices` (`id`);

--
-- Constraints for table `user_hash`
--
ALTER TABLE `user_hash`
  ADD CONSTRAINT `user_hash_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `webhooks`
--
ALTER TABLE `webhooks`
  ADD CONSTRAINT `webhooks_ibfk_1` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`id`) ON DELETE NO ACTION;

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;