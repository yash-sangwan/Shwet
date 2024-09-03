use anchor_lang::prelude::*;

pub mod constant;
pub mod states;
use crate::{constant::*, states::*};

// It is the program address
declare_id!("4jwLwSKQ1AM5PtfCFf6VppHdpEb3VfBAS26cbqYwU8rW");

#[program]
pub mod blog_sol {
    use super::*;

    pub fn init_user(ctx: Context<InitUser>, name:String) -> Result<()> {
        // write logic here
        let user_account = &mut ctx.accounts.user_account;
        let authority = &mut ctx.accounts.authority;
        user_account.name = name;
        user_account.last_post_id = 0;
        user_account.post_count = 0;
        user_account.authority = authority.key();

        Ok(())
    }

    pub fn create_post(ctx: Context<CreatePost>, title:String, media:String, content: String, source: String, proof: String) -> Result<()> {
        // Initialize the post
        // Increment the total post and post id

        let post_account = &mut ctx.accounts.post_account;
        let user_account = &mut ctx.accounts.user_account;
        let authority = &mut ctx.accounts.authority;

        post_account.id = user_account.last_post_id;
        post_account.title = title;
        post_account.media = media;
        post_account.content = content;
        post_account.source = source;
        post_account.proof = proof;
        post_account.user = user_account.key();
        post_account.authority = authority.key();

        user_account.last_post_id = user_account.last_post_id
        .checked_add(1)
        .unwrap();

        user_account.post_count = user_account.post_count
        .checked_add(1)
        .unwrap();

        Ok(())

    }
}

#[derive(Accounts)]
#[instruction()]
pub struct InitUser<'info>{
    #[account(
        init,
        seeds = [USER_SEED, authority.key().as_ref()],
        bump,
        payer = authority,
        space = 260 + 8
    )]
    pub user_account: Account<'info, User>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction()]
pub struct CreatePost<'info> {
    #[account(
        init,
        seeds = [POST_SEED, authority.key().as_ref(), &[user_account.last_post_id as u8].as_ref()],
        bump,
        payer = authority,
        space =  13012 + 8
    )]
    pub post_account: Account<'info, Post>,

    #[account(
        mut, 
        seeds = [USER_SEED, authority.key().as_ref()],
        bump,
        has_one = authority
    )]

    pub user_account: Account<'info, User>,
    
    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,


}