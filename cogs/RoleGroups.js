// cogs/RoleGroups.js
// I hate this, they want us to move to apitypes
const { SlashCommandBuilder } = require('@discordjs/builders');
const {MessageFlags} = require("discord.js")

const {IsAdmin} = require("../helpers/RankChecker")

const GROUP1 = new Set([
  '1373784946606608445',
  '1356816897705775174',
  '1356816898884374531',
  '1356816900427878472',
]);
const TARGET1 = '1356837034135650454';

const GROUP2 = new Set([
  '1356816902781009961',
  '1356816903401639939',
]);
const TARGET2 = '1356836972802347064';

const GROUP3 = new Set([
  '1356837034135650454',
  '1356836972802347064',
]);
const TARGET3 = '1356818546532810933';


/**
 * Core sync routine: given a member’s roles, ensure
 * they have/lose the target role based on group membership.
 */
async function SyncMemberRoles(member) {
  const roles = new Set(member.roles.cache.keys());

  const SyncGroup = async (groupSet, targetRoleIds) => {
    if (!Array.isArray(targetRoleIds)) {
      targetRoleIds = [targetRoleIds];
    }

    const hasGroup = [...roles].some(r => groupSet.has(r));

    for (const targetRoleId of targetRoleIds) {
      const hasTarget = roles.has(targetRoleId);

      if (hasGroup && !hasTarget) {
        console.log(`[Role Sync] Adding missing role (${targetRoleId}) to ${member.user.tag} due to group match.`);
        await member.roles.add(targetRoleId).catch(error => {
          console.error(`[Role Sync Error] Failed to add role (${targetRoleId}) to ${member.user.tag}:`, error);
        });
      } else if (!hasGroup && hasTarget) {
        console.log(`[Role Sync] Removing unqualified role (${targetRoleId}) from ${member.user.tag} due to no group match.`);
        await member.roles.remove(targetRoleId).catch(error => {
          console.error(`[Role Sync Error] Failed to remove role (${targetRoleId}) from ${member.user.tag}:`, error);
        });
      }
    }
  };

  try {
    await SyncGroup(GROUP1, TARGET1);
    await SyncGroup(GROUP2, TARGET2);
    await SyncGroup(GROUP3, TARGET3);
  } catch (error) {
    console.error(`[SyncMemberRoles Error] An unexpected error occurred while syncing roles for ${member.user.tag}:`, error);
  }
}

/**
 * Event handler for only a single member update.
 */
async function HandleGuildMemberUpdate(client, oldMember, newMember) {
  console.log('🔍 Syncing roles for', newMember.user.tag);
  await SyncMemberRoles(newMember);
}

module.exports = {
  name: 'RoleGroups',
  event: 'guildMemberUpdate',
  onEvent: HandleGuildMemberUpdate,

  data: new SlashCommandBuilder()
    .setName('updateall')
    .setDescription('Sync roles for all members based on your role groups'),

  async execute(interaction) {
    await interaction.deferReply({ flags: MessageFlags.Ephemeral })

    await interaction.guild.members.fetch();

    let count = 0;
    for (const member of interaction.guild.members.cache.values()) {
      if (member.user.bot) continue;
      await SyncMemberRoles(member);
      count++;
    }

    await interaction.editReply(`✅ Synced roles for ${count} members.`);
  },
};
