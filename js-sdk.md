# Mon SMS PRO JavaScript SDK Documentation

## Table of Contents

- [Installation](#installation)
- [Initialization](#initialization)
- [Campaign Management](#campaign-management)
- [Contact Management](#contact-management)
- [Group Management](#group-management)
- [OTP Management](#otp-management)
- [Sender Management](#sender-management)
- [Credit Management](#credit-management)

## Installation

```bash
npm install @freddydrodev/monsmspro
```

## Initialization

```typescript
import { MonSMSPRO } from "@freddydrodev/monsmspro";

const sms = MonSMSPRO(process.env["API_KEY"] ?? "");
```

## Campaign Management

### `sms.campain.create`

Create a new campaign (standard, scheduled, or recurring).

```typescript
const campaign = await sms.campain.create({
  contacts: [
    {
      id?: string;      // Optional: Contact ID if exists
      phone: string;    // Required: Phone number (format: 22500000000)
      name?: string;    // Optional: Full name
      firstName?: string; // Optional: First name
      lastName?: string;  // Optional: Last name
      sex?: "M" | "F";   // Optional: Gender
    }
  ],
  groupsIds?: string[];  // Optional: List of group IDs
  text: string;         // Required: Message content
  senderId?: string;    // Optional: Sender ID
  type?: "SMS" | "SCHEDULED" | "RECURRING"; // Optional: Campaign type
  scheduledDate?: Date; // Optional: For SCHEDULED type
  recurring?: {         // Optional: For RECURRING type
    monday?: Date;
    tuesday?: Date;
    wednesday?: Date;
    thursday?: Date;
    friday?: Date;
    saturday?: Date;
    sunday?: Date;
  };
});
```

## Contact Management

### `sms.contact.create`

Create new contacts.

```typescript
const contacts = await sms.contact.create({
  contacts: [
    {
      phone: string;    // Required: Phone number
      name: string;     // Required: Full name
      firstName?: string; // Optional: First name
      lastName?: string;  // Optional: Last name
      sex?: "M" | "F";   // Optional: Gender
    }
  ]
});
```

### `sms.contact.list`

List all contacts.

```typescript
const contacts = await sms.contact.list();
```

### `sms.contact.update`

Update contact information.

```typescript
const contact = await sms.contact.update({
  phone: string;       // Required: Phone number
  name?: string;       // Optional: Full name
  firstName?: string;  // Optional: First name
  lastName?: string;   // Optional: Last name
  sex?: "M" | "F";    // Optional: Gender
});
```

### `sms.contact.delete`

Delete contacts by IDs.

```typescript
const result = await sms.contact.delete({
  contactIds: string[]; // Required: Array of contact IDs
});
```

## Group Management

### `sms.group.create`

Create a new group.

```typescript
const group = await sms.group.create({
  name: string;        // Required: Group name
  description?: string; // Optional: Group description
  contacts: [
    {
      id?: string;      // Optional: Contact ID if exists
      phone: string;    // Required: Phone number
      name?: string;    // Optional: Full name
      firstName?: string; // Optional: First name
      lastName?: string;  // Optional: Last name
      sex?: "M" | "F";   // Optional: Gender
    }
  ]
});
```

### `sms.group.list`

List all groups.

```typescript
const groups = await sms.group.list({
  orderBy?: "name" | "createdAt"; // Optional: Sort criteria
  page?: number;                  // Optional: Page number
  limit?: number;                 // Optional: Items per page
});
```

### `sms.group.get`

Get group details.

```typescript
const group = await sms.group.get({
  id: string; // Required: Group ID
});
```

### `sms.group.delete`

Delete a group.

```typescript
const result = await sms.group.delete({
  id: string; // Required: Group ID
});
```

## OTP Management

### `sms.otp.get`

Send OTP code.

```typescript
const otp = await sms.otp.get({
  phoneNumber: string;                    // Required: Phone number
  length?: number;                        // Optional: Code length (4-8)
  mode?: "NUMERIC" | "ALPHABET" | "ALPHA_NUMERIC"; // Optional: Code mode
  senderId?: string;                      // Optional: Sender ID
  appName?: string;                       // Optional: Application name
});
```

### `sms.otp.verify`

Verify OTP code.

```typescript
const result = await sms.otp.verify({
  phoneNumber: string; // Required: Phone number
  otp: string;        // Required: OTP code
  token: string;      // Required: Token from get response
});
```

## Sender Management

### `sms.sender.create`

Create a new sender ID.

```typescript
const sender = await sms.sender.create({
  name: string;        // Required: Sender name (3-11 chars)
  description: string; // Required: Description for operators
});
```

### `sms.sender.list`

List all sender IDs.

```typescript
const senders = await sms.sender.list();
```

### `sms.sender.campains`

Get campaigns for a specific sender.

```typescript
const campaigns = await sms.sender.campains({
  id: string; // Required: Sender ID
});
```

## Credit Management

### `sms.user.credit`

Get current credit balance.

```typescript
const credit = await sms.user.credit();
```

## Notes

1. All methods are asynchronous and return Promises
2. Phone numbers should be in international format without '+' (e.g., "22500000000")
3. All dates for scheduled and recurring campaigns must be in multiples of 15 minutes
4. Error handling should be implemented using try/catch blocks
5. The SDK is fully typed for TypeScript support
