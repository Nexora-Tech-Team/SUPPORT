export interface Article {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  content: string; // markdown-like plain text sections separated by \n\n
}

export const articles: Article[] = [
  {
    id: 'kb-1',
    category: 'Getting Started',
    title: 'How to submit your first support ticket',
    excerpt: 'Learn how to create, track, and manage your support requests through the portal.',
    readTime: '2 min read',
    content: `## Overview\n\nSubmitting a support ticket is the fastest way to get help from our team. This guide walks you through the process step by step.\n\n## Step 1 — Navigate to the Help Center\n\nFrom the main menu, click on **Help Center** or go directly to /help. You will see a list of service categories.\n\n## Step 2 — Choose a Category\n\nSelect the category that best matches your request — for example, LMS, Website, or Marketing. This ensures your ticket reaches the right team immediately.\n\n## Step 3 — Fill in the Details\n\nProvide a clear subject line and a detailed description of your issue. The more context you give, the faster our team can resolve it. You can also attach screenshots or files (up to 5 files, 10 MB each).\n\n## Step 4 — Set a Priority\n\nChoose the urgency level that best reflects your situation:\n- **Low** — General questions, no urgency\n- **Medium** — Affecting work but a workaround exists\n- **High** — Significantly impacting productivity\n- **Urgent** — Complete blocker, business critical\n\n## Step 5 — Submit and Track\n\nAfter submitting, you will receive a confirmation and a unique ticket ID. Visit **My Tickets** at any time to check the status and reply to agent messages.`,
  },
  {
    id: 'kb-2',
    category: 'Getting Started',
    title: 'Understanding ticket statuses',
    excerpt: 'A guide to what Open, In Progress, Waiting on Customer, Resolved, and Closed mean.',
    readTime: '3 min read',
    content: `## Overview\n\nEvery ticket goes through a lifecycle from creation to resolution. Understanding each status helps you know what to expect at every stage.\n\n## Open\n\nThe ticket has been submitted and is awaiting assignment to a support agent. This is the initial state for all new tickets.\n\n## In Progress\n\nAn agent has picked up your ticket and is actively working on a resolution. You may receive questions or updates during this phase.\n\n## Waiting on Customer\n\nThe agent has replied and is waiting for additional information or confirmation from you. Make sure to check your email or the ticket portal and respond promptly to avoid delays.\n\n## Resolved\n\nThe agent believes the issue has been addressed. If you are satisfied with the resolution, no action is needed. If the issue persists, you can reply to reopen the ticket.\n\n## Closed\n\nThe ticket has been fully resolved and closed. Closed tickets are archived but remain visible in **My Tickets** for your reference.`,
  },
  {
    id: 'kb-3',
    category: 'Account',
    title: 'How to reset your password',
    excerpt: 'Step-by-step instructions for resetting your account password via email.',
    readTime: '1 min read',
    content: `## Overview\n\nIf you have forgotten your password, you can reset it quickly using your registered email address.\n\n## Steps\n\n1. Go to the login page at /login.\n2. Click **Forgot password?** below the login button.\n3. Enter your registered email address and submit.\n4. Check your inbox for a password reset email (also check your spam folder).\n5. Click the reset link in the email — it is valid for 1 hour.\n6. Enter and confirm your new password.\n7. Log in with your new password.\n\n## Tips\n\n- Use a strong password with at least 8 characters, including uppercase letters, numbers, and symbols.\n- If you do not receive the email within 5 minutes, try again or contact support.`,
  },
  {
    id: 'kb-4',
    category: 'Account',
    title: 'Updating your profile information',
    excerpt: 'How to update your name, email, and other account details in the portal.',
    readTime: '2 min read',
    content: `## Overview\n\nKeeping your profile information up to date ensures you receive notifications correctly and that our team can reach you.\n\n## What you can update\n\n- Display name\n- Email address\n- Password\n- Notification preferences\n\n## How to update\n\n1. Log in to the portal.\n2. Click your name in the top-right corner.\n3. Select **Profile** or **Settings** from the dropdown.\n4. Edit the fields you want to change.\n5. Click **Save** to apply the changes.\n\n## Note\n\nChanging your email address will require re-verification. A confirmation link will be sent to your new email. Your account will continue to work with the old email until you verify the new one.`,
  },
  {
    id: 'kb-5',
    category: 'LMS',
    title: 'Accessing your courses and certificates',
    excerpt: 'How to find your enrolled courses, download certificates, and track learning progress.',
    readTime: '3 min read',
    content: `## Overview\n\nThe Learning Management System (LMS) gives you access to all your enrolled courses, assessments, and certificates in one place.\n\n## Finding Your Courses\n\n1. Log in to the LMS portal.\n2. Navigate to **My Learning** or **Dashboard**.\n3. All enrolled courses are listed here with their current progress.\n\n## Downloading Certificates\n\nOnce you complete a course and pass any required assessments:\n1. Go to **My Certificates** in the LMS.\n2. Find the completed course.\n3. Click **Download Certificate** to save it as a PDF.\n\n## Tracking Progress\n\nEach course shows a progress bar indicating how much you have completed. Click into a course to see chapter-level completion status.\n\n## Need Help?\n\nIf a course is not showing, your certificate is missing, or you are unable to access content, submit a ticket under the **LMS** category and our team will assist you.`,
  },
  {
    id: 'kb-6',
    category: 'LMS',
    title: 'Troubleshooting LMS login issues',
    excerpt: 'Common solutions for login problems, browser compatibility, and session errors.',
    readTime: '4 min read',
    content: `## Overview\n\nLogin issues in the LMS are usually caused by browser settings, cached credentials, or account configuration. Try the steps below before submitting a ticket.\n\n## Clear Cache and Cookies\n\n1. Open your browser settings.\n2. Navigate to Privacy or History.\n3. Clear cached images and cookies.\n4. Close and reopen the browser, then try logging in again.\n\n## Try a Different Browser\n\nThe LMS works best on the latest versions of Chrome, Firefox, and Edge. If you are using Safari or an older browser, switch to Chrome and try again.\n\n## Disable Browser Extensions\n\nSome extensions (especially ad blockers or VPNs) can interfere with the LMS. Try disabling extensions temporarily.\n\n## Check Your Credentials\n\n- Make sure Caps Lock is off.\n- Use the **Forgot Password** option to reset your password if you are unsure.\n\n## Account Not Found\n\nIf you receive an "account not found" message, your account may not have been provisioned yet. Contact your administrator or submit a ticket under the **LMS** category.`,
  },
  {
    id: 'kb-7',
    category: 'Website',
    title: 'Requesting website content changes',
    excerpt: 'The correct process for submitting website update requests to the team.',
    readTime: '2 min read',
    content: `## Overview\n\nAll website content changes — including text updates, image replacements, and new page requests — go through the support portal to ensure proper review and approval.\n\n## What to Include in Your Request\n\nWhen submitting a Website ticket, please include:\n- The specific page URL where the change is needed\n- A clear description of what needs to change and why\n- Any replacement text, images, or assets as file attachments\n- Your preferred deadline (if applicable)\n\n## Types of Requests\n\n- **Content update** — Changing existing text, images, or links\n- **New page** — Adding a new page or section\n- **Bug report** — Something is broken or not displaying correctly\n- **Performance issue** — The website is slow or timing out\n\n## Review Process\n\nWebsite changes are reviewed by the digital team before going live. Standard changes take 2–3 business days. Urgent fixes are prioritized.`,
  },
  {
    id: 'kb-8',
    category: 'Marketing',
    title: 'Submitting design and collateral requests',
    excerpt: 'How to request brochures, banners, email blasts, and other marketing materials.',
    readTime: '3 min read',
    content: `## Overview\n\nThe Marketing team handles all design and communication collateral requests. Submit your request early to allow enough time for review and revisions.\n\n## What You Can Request\n\n- Brochures and flyers\n- Social media graphics\n- Email blast templates\n- Event banners and signage\n- Presentation decks\n- Video or animation briefs\n\n## How to Submit\n\n1. Open a new ticket under the **Marketing** category.\n2. In the subject, briefly describe the deliverable (e.g., "Event banner for Training Day 2026").\n3. In the description, include:\n   - Purpose and target audience\n   - Key messages or copy\n   - Brand guidelines or references\n   - Required formats and dimensions\n   - Deadline\n4. Attach any reference files, logos, or existing assets.\n\n## Turnaround Time\n\nSimple requests (social posts, minor edits) take 2–3 business days. Complex deliverables (full brochure, video) take 5–10 business days. Rush requests are accommodated when possible.`,
  },
  {
    id: 'kb-9',
    category: 'Training',
    title: 'Scheduling a training session',
    excerpt: 'How to coordinate training schedules, add new standards, and request training support.',
    readTime: '2 min read',
    content: `## Overview\n\nThe Training Services team coordinates all internal and external training sessions, standards updates, and certification programs.\n\n## Scheduling a Session\n\n1. Submit a ticket under the **Training Services** category.\n2. Include the following:\n   - Training topic or program name\n   - Preferred dates and times (provide at least 3 options)\n   - Number of participants\n   - Delivery format (in-person, virtual, hybrid)\n   - Any specific trainer or material requirements\n\n## Adding New Standards\n\nIf you need to add or update training standards or competency frameworks, include:\n- The standard name and reference code\n- The relevant regulatory body or source document\n- The target audience for this standard\n\n## Lead Time\n\nPlease submit training requests at least **2 weeks in advance** for standard sessions and **4 weeks** for new programs or certifications.`,
  },
  {
    id: 'kb-10',
    category: 'AuditQ',
    title: 'Managing audit documentation requests',
    excerpt: 'Steps to submit and track audit-related documentation and project extension requests.',
    readTime: '3 min read',
    content: `## Overview\n\nAuditQ handles all audit coordination, documentation management, and project-related support. Use this category for any audit lifecycle requests.\n\n## Documentation Requests\n\nTo request audit documents:\n1. Submit a ticket under **AuditQ**.\n2. Specify the document type (audit report, evidence package, corrective action plan, etc.).\n3. Include the audit reference number or project name.\n4. State the required submission date.\n\n## Project Extension Requests\n\nIf you need more time to complete audit tasks:\n1. Submit an extension request as early as possible.\n2. Include the original deadline, reason for extension, and proposed new deadline.\n3. Attach any supporting evidence or correspondence.\n\n## Tracking Your Requests\n\nAll AuditQ requests are tracked in **My Tickets**. You will receive email updates when the status changes or the team needs additional information.\n\n## Escalation\n\nFor urgent audit matters, set the priority to **Urgent** and include a brief note on why immediate attention is needed.`,
  },
];

export function getArticleById(id: string): Article | undefined {
  return articles.find((a) => a.id === id);
}
